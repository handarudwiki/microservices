module.exports = (...roles)=>{
    return (req, res, next)=>{
        const role = req.user.data.role
        if(!roles.includes(role)){
            return res.status(405).json({
                status : 'error',
                message : 'You dont have permission to access this endpoint'
            })
        }
        return next()
    }
}