import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model.js";
import { connect } from "@/dbConfig/dbConfig.js";
import { NextResponse } from "next/server";

connect()

export const GET = async (req) => {
    try {
        
        const UserId = await getDataFromToken(req)
        console.log(UserId)

        const user = await User.findById(UserId).select("-password")

        if (!user) {
            return NextResponse.json({erro: "something went wrong"})
        }

        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({erro: "something went wrong"})
    }
}