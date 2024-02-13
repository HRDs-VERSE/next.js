import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/user.model.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

connect();

export const POST = async (request) => {

    try {
        const reqBody = await request.json();
        const { credential, password } = reqBody;

        if (!(credential || password)) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        
        const user = await User.findOne({
            $or: [{email: credential}, {username: credential}]});

        if (!user) {
            return NextResponse.json({ error: "No user found" });
        }

        const validPassword  = await bcrypt.compare(password, user?.password)

        if (!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {error: 400})
        }

        const tokenData = {
            id: user?._id,
            username: user?.username,
            email: user?.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRECT, {expiresIn: "1d"})

        const response = await NextResponse.json({
            message: "Login successful",
            success: true,
            user
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response


    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
};
