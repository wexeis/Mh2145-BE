import mongoose from "mongoose";

const userSchema = mongoose.Schema(

    {
        firstName:{
            type:String,
            required:[true,'Please add a complete name']
        },

        lastName:{
            type:String,
            required:[true,'Please add a complete name']
        },

        email: {
            type:String,
            required:[true,'plz add an email'],
            unique:true
        },

        password:{
            type:String,
            required:[true,'plz add a password']

        },
        role:{
            type:String,
            required:[true,'plz add a role']
            

        }



    },
    {
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema);
export default User;