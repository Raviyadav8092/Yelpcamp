const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {

    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];




const seedDB = async () =>{
     await Campground.deleteMany({});
    for(let i=0;i<250;i++)
    {
        const random1000 = Math.floor(Math.random()*1000);
        const price =  Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:'64b59f61283ed515c09ab6ba',
            location : `${cities[random1000].city} , ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description:'lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
            //price:`${price}`
            price,
            geometry: {
                     type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
                    },
            images : [
                {
                    url: 'https://res.cloudinary.com/dfasy0zmi/image/upload/v1690612890/YelpCamp/oyxig9klzfvdnovz4lbd.png',
                    filename: 'YelpCamp/oyxig9klzfvdnovz4lbd',
                },
                {
                  url: 'https://res.cloudinary.com/dfasy0zmi/image/upload/v1690612888/YelpCamp/h0acqunwwdvrncxtn2um.png',
                  filename: 'YelpCamp/h0acqunwwdvrncxtn2um',
                },
                {
                    url: 'https://res.cloudinary.com/dfasy0zmi/image/upload/v1690612883/YelpCamp/xp6kau0hkrzc6rkymdm2.jpg',
                  filename: 'YelpCamp/xp6kau0hkrzc6rkymdm2',
                 
                }
              ]
        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})