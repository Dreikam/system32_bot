import boom from '@hapi/boom'

export const auth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } else {
        return next(boom.unauthorized("Tienes que estar autenticado"))
    }
}