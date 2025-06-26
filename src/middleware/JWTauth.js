import jwt from 'jsonwebtoken';
import { LogA, LogE } from '../../logs/logger.js';

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        LogA('JWT Token Verified', { userId: user.id });
        next();
    } catch (error) {
        LogE('JWT Middleware Error', error);
        return res.redirect('/')
    }
}

export { verifyToken };