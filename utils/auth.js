const jwt = require("jsonwebtoken");


exports.generatetoken = (userData) => {
    return jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXP_IN });
}

exports.isAuthentication = (req, res, next) => {
    try {
        let token = req.body.token || req.params.token || req.headers["authorization"];
        if (token) {
            token = token.split(' ')[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if(err){
                    res.status(401).json({message: `please provide a valid token ${err}`})
                }else {
                    next();
                }
            });
        } else {
            res.status(403).json({ message: "Invalid Token!..." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}