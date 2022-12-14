
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
       return res.sendStatus(401);
    }
}

module.exports = {isLoggedIn}