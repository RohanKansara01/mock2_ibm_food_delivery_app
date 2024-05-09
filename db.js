const mongoose=require('mongoose');
const connection=mongoose.connect(`mongodb+srv://rohankansara2000:test@databasetest.cehhvv0.mongodb.net/FoodDeliveryApp`);
const{Schema}=mongoose;
const ObjectId=Schema.Types.ObjectId;

const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{
        type:Object,
        properties:{
            street:{type:String, required:true},
            city:{type:String, required:true},
            state:{type:String, required:true},
            country:{type:String, required:true},
            zip:{type:String, required:true},
        }
    }
})

const User=mongoose.model("User",userSchema);


const restaurantSchema=mongoose.Schema({
    name:{type:String, required:true},
    address:{
        type:Object,
        properties:{
            street:{type:String, required:true},
            city:{type:String, required:true},
            state:{type:String, required:true},
            country:{type:String, required:true},
            zip:{type:String, required:true},
        }
    },
    menu:{type:Array,
        properties:{
            name:{type:String, required:true},
            description:{type:String, required:true},
            price:{type:Number, required:true},
            image:{type:String, required:true},
        }
    }
})

const Restaurant=mongoose.model("Restaurant",restaurantSchema);


const orderSchema=mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
    restaurant : { type: ObjectId, ref: 'Restaurant' },
    items:{type:Array,
        properties:{
            name:{type:String, required:true},
            price:{type:Number, required:true},
            quantity:{type:Number, required:true},
        }
    },
    totalPrice:{type:Number, required:true},
    deliveryAddress:{
        type:Object,
        properties:{
            street:{type:String, required:true},
            city:{type:String, required:true},
            state:{type:String, required:true},
            country:{type:String, required:true},
            zip:{type:String, required:true},
        }
    },
    status:{type:String, required:true}
})

const Order=mongoose.model("Order",orderSchema);

module.exports={connection, User, Restaurant, Order};

// {
// 	 _id: ObjectId,
// 	 user : { type: ObjectId, ref: 'User' },
// 	 restaurant : { type: ObjectId, ref: 'Restaurant' },
//    items: [{
//      name: String,
//      price: Number,
//      quantity: Number
//    }],
//    totalPrice: Number,
//    deliveryAddress: {
//      street: String,
//      city: String,
//      state: String,
//      country: String,
//      zip: String
//    },
//    status: String // e.g, "placed", "preparing", "on the way", "delivered"
// }

// {
//   _id: ObjectId,
//   name: String,
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     country: String,
//     zip: String
//   },
//   menu: [{
//     _id: ObjectId,
//     name: String,
//     description: String,
//     price: Number,
//     image: String
//   }]
// }

// {
//   _id: ObjectId,
//   name: String,
//   email: String,
//   password: String,
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     country: String,
//     zip: String
//   }
// }