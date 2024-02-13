import mongoose  from "mongoose";

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please provide username"],
        lowercase: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: [true, "Please provide email"],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: [true, "Please provide password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPassword: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

}, {timestamps: true})

let User
try {
    User = mongoose.model("User");
} catch (error) {
    User = mongoose.model("User", userShcema);
}


export default User