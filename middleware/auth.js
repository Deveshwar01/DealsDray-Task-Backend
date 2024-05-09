import { User } from "../models/users.js";
import jwt from "jsonwebtoken"
export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;
    if (!token)
        return res.status(404).json({
            success: false,
            message: "Login First",
        });

    const decoded = jwt.verify(token, "123")
    req.user = await User.findOne({ _id: decoded._id });
    next();
}