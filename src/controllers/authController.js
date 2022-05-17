import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    const user = await User.create({ name, email, password, phoneNumber });
    user.password = undefined;
    res
        .status(StatusCodes.CREATED)
        .json({ user });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')
    const token = user.createJWT();
    user.password = undefined;
    res
        .cookie("token", token,
            {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production' ? true : false
            })
        .status(StatusCodes.OK)
        .json({ user });
}

const logout = async (req, res) => {
    res
        .clearCookie('token')
        .status(StatusCodes.OK)
        .send('User Logged out!')
}

export default { register, login, logout };