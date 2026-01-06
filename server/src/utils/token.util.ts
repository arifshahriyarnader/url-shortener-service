import jwt from "jsonwebtoken";
import { IUser } from "../types";

const secret = process.env.JWT_SECRET!;

export function generateTokens(user: IUser){
    const payload={
        id: user.id,
        email: user.email
    }
    const accessToken=jwt.sign(payload,secret, {expiresIn:"1d"});
    const refreshToken=jwt.sign(payload,secret, {expiresIn:"30d"});
    return {accessToken, refreshToken};
}

export function generateUserObject(user: IUser){
    const {password, ...safeUser} = user;
    const tokens= generateTokens(user);
    return{...safeUser, ...tokens};
}