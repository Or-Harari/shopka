const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const itemRoutes = require('./routes/items-routes');
const userRoutes = require('./routes/users-routes');

const port = '8080';
const app = express();

app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json());
app.use(express.static('../pwm-app/build'));

const connectToDb = async() => {
    mongoose.connection.on("error", function(err) {
        console.log("Could not connect to MongoDb!");
      })
    mongoose.connect('mongodb+srv://orharari:rOJlLS62j7FcQ64K@cluster0.f1oe6.mongodb.net/PWM?retryWrites=true&w=majority',error => {
            if(error){
                console.log(error)
            }
        })
}
connectToDb();
    


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
})

app.use('/api', userRoutes);
app.use('/api',itemRoutes);



// const dbWatch = mongoose.model('watch',itemsSchema);

// app.get('/getWatchItems', (req, res) => {
//     const getAllWatchData = async ()=>{
//         const items = await dbWatch.find({})
//         console.log(items);
//         res.json(items)
//     }
//     getAllWatchData()
// })


app.listen(port, ()=>{
    console.log('app woking on port' + port);
})
