import  jwt  from "jsonwebtoken";
import toast from "react-hot-toast";

export const getDataFromToken = (req) => {
    try {
        
        const token = req.cookies.get("token")?.value || ""
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRECT)

        return decodedToken?.id

    } catch (error) {
        toast.error(error.message)
    }
}