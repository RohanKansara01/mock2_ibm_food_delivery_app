const express=require('express');
const app=express();
app.use(express.json());
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const cors=require('cors');
app.use(cors());


const{connection, User, Restaurant, Order}=require('./db');


//Registering
app.post("/api/register", async(req,res)=>{
    try {
        const user=req.body;
        const hashed=user.password;
        bcrypt.hash(hashed, 6,async function(err,hash){
            if(err){
                res.send('error hashing',err);
            }else{
                await User.create({
                    name:user.name,
                    email:user.email,
                    password:hash
                });
                res.status(201).send(req.body);
                console.log(hash);
            }
        });
    } catch (error) {
        console.log("error registering the user");
    }
})


//Login
app.post("/api/login", async(req ,res)=>{
    try {
        const data=req.body;
        const email=data.email;
        console.log(data)
        const user=await User.findOne({email});
        console.log(email)
        console.log(user)
        const hashed=user.password;
        bcrypt.compare(data.password, hashed, function(err, result){
            if(result===true){
                const token=jwt.sign({userID:user._id}, "rohan");
                console.log(token)
                res.status(201).send({message:'you are loged in', token:token});
                console.log(token);
            }else{
                res.status(401).send("user not found");
                console.log("this error is from login", err)
            }
        });
    } 
    catch (error) {
        console.log("Error login in");    
    }
})


//POST restaurant data
app.post('/api/restaurants', async(req, res)=>{
    try {
        const data=await Restaurant.create(req.body);
        res.status(201).send(data); 
        console.log('data posted successfully', data);
    } catch (error) {
        console.error('Error posting data', error);
        res.status(500).send('Internal Server Error');
    }
})


//GET all restaurants
app.get("/api/restaurants", async(req ,res)=>{
    try {
        const data = await Restaurant.find();
        res.status(200).send(data)
        console.log('data recieved successfully');
    } catch (error) {
        console.log("error getting the data")
    }
})


//GET restaurant by id
app.get("/api/restaurants/id", async(req ,res)=>{        
    try {
        const restaurantId=req.params.id;
        const data=await Restaurant.find(restaurantId);
        console.log(data)
        res.status(200).send(data);
        //console.log('restaurant');
    } catch (error) {
        console.log(error)
    }
})


//POST order
app.post('/api/orders', async(req, res)=>{
    try {
        const data=await Order.create(req.body);
        res.status(201).send(data); 
        console.log('data posted successfully', data);
    } catch (error) {
        console.error('Error posting data', error);
        res.status(500).send('Internal Server Error');
    }
})


//GET order by id
app.get("/api/orders/id", async(req ,res)=>{        
    try {
        const restaurantId=req.params.id;
        const data=await Order.find(restaurantId);
        console.log(data)
        res.status(200).send(data);
        //console.log('order');
    } catch (error) {
        console.log(error)
    }
})


const PORT=8080;
app.listen(PORT ,()=>{
    try {
        console.log(`Connected to PORT:${PORT}`);
    } catch (error) {
        console.log(`error connecting to PORT:${PORT}`)
    }
})

//restaurant data dummy
// {
//   "name": "String",
//   "address": {
//     "street": "String",
//     "city": "String",
//     "state": "String",
//     "country": "String",
//     "zip": "String"
//   },
//   "menu": [{
//     "name": "String",
//     "description": "String",
//     "price": 1500,
//     "image": "String"
//   }]
// }