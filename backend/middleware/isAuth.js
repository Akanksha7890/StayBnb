import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        // Fix 1: 'return' lagana zaroori hai
        if (!token) {
            return res.status(400).json({ message: "user doesn't have a token" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fix 2: verifyToken object check karo, null nahi
        if (!verifyToken) {
            return res.status(400).json({ message: "user doesn't have a Valid token" });
        }

        // Token sahi hai, toh userId attach karo
        req.userId = verifyToken.userId;
        next(); // Agle controller par jao

    } catch (error) {
        // Fix 3: Agar token expire ho gaya ya galat hai, catch block chalega
        return res.status(500).json({ message: `isAuth error: ${error.message}` });
    }
}

export default isAuth;
