const express=require('express');
const app=express();
app.use(express.json());
const bcrypt=require('bcrypt');


const{connection, User, Restaurant, Order}=require('./db');

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

const PORT=8080;
app.listen(PORT ,()=>{
    try {
        console.log(`Connected to PORT:${PORT}`);
    } catch (error) {
        console.log(`error connection to PORT:${PORT}`)
    }
})