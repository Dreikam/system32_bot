function isAuthorized(req, res, next) {
    if(req.user) {
        next();
    } else {
        return res.redirect('/auth')
    }
}

module.exports = {
    isAuthorized
}