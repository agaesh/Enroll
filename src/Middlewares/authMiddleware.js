const jwt = require('jsonwebtoken')

exports.verifyWebToken =(req, res, next)=>{
    const token = res.cookie.token;

    if(!token){
        return res.status(501).json({message:"No access"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
}