const { getUser } = require('../service/auth');

// const checkForAuthentication = async(req, res, next) => {
//     const tokenCookie = req.cookies?.token;
//     req.user = null;
//     if (!tokenCookie) return res.status(401).redirect('/login');

//     const user = getUser(token);
//     if (!user) return res.status(401).redirect('/login');
//     req.user = user;
//     return next();
// }

// const restrictTo = (roles) => {
//     return (req, res, next) => {
//         if (!req.user) return res.status(401).redirect('/login');

//         if(!roles.includes(req.user.role)) return res.status(403).end('Unauthorized access!');
//         return next();
        
//     }
// }

const restrictToLoggedInUserOnly = async(req, res, next) => {
    const tokenCookie = req.cookies?.token;
    // const userUid = req.headers['Authorization'];
    if (!tokenCookie) {
        return res.status(401).redirect('/login');
    }
    // const token = userUid?.split('Bearer ')[1];
    const user = getUser(tokenCookie);
    // const user = getUser(token);
    if (!user) {
        return res.status(401).redirect('/login');
    }
    req.user = user;
    next();
}

const checkAuth = async(req, res, next) => {
    const tokenCookie = req.cookies?.token;
    // const userUid = req.headers['authorization'];
    // const token = userUid?.split('Bearer ')[1];
    const user = getUser(tokenCookie);
    // const user = getUser(token);
    
    req.user = user;
    next();
}

module.exports = {
    // checkForAuthentication,
    // restrictTo,
    restrictToLoggedInUserOnly,
    checkAuth,
}