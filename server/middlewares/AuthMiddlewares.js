const {verify} = require('jsonwebtoken')
const validateToken = (req,res,next) => {
    const accessToken = req.header("accessToken")
    if(!accessToken) return res.json({Error: "User not logged in"})
    try{
        const validToken = verify(accessToken,"rajendra");
        req.user = validToken;
        if (validToken) return next();
    }catch (e) {
        return res.json({Error: "Invalid token"})
    }
}

module.exports = {validateToken}
