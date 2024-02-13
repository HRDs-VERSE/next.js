import nodemailer from "nodemailer"
import User from "@/models/user.model.js"
import bcryptjs from "bcryptjs"

export const sendEmail = async (email, emailType, userId) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            
            await User.findByIdAndUpdate(
                userId,
                {
                    VerifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        } else if(emailType === "RESET"){

            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPassword: hashedToken,
                    forgotPasswordExpiry: Date.now() + 3600000
                })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "89403f5b764965",
              pass: "7a6b951b002540"
            }
          });

    } catch (error) {
        toast.error('Sowething went wrong')
    }

}