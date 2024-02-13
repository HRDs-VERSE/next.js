import { connect } from "@/dbConfig/dbConfig.js"
import {  NextResponse } from "next/server"

connect()

export const GET = async () => {
    try {

        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })

        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})

        return response
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500 })
    }


}