const {RefreshToken, User} = require('../models');
const validator  = require('fastest-validator');
const { where } = require('sequelize');
const v = new validator()

const create = async (req,res) => {
    try {
        schema = {
            token : 'string|empty:false',
            user_id : 'number|empty:false',
        }

        const validate = await v.validate(req.body, schema)

        if(validate.length){
            return res.status(400).json({
                status : 'error',
                message : validate
            })
        }

        const user = await User.findByPk(req.body.user_id)

        if(!user){
            return res.status(404).json({
                status : 'error',
                message : 'user not found'
            })
        }

        const refreshToken = await RefreshToken.create(req.body)

        return res.status(200).json({
            status : 'success',
            data : refreshToken
        })
    } catch (error) {
        return res.status(500).json({
            statsu : 'error',
            message : error.message
        })
    }
}

const getRefreshTokens = async (req, res) => {
    try {
        const refreshToken = req.query.refresh_token

        const whereClause = refreshToken ? {where : {
            token : refreshToken
        }} : {}

        const refreshTokens = await RefreshToken.findAll(whereClause)

        return res.status(200).json({
            status : 'success',
            data : refreshTokens,
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

module.exports = {
    create,
    getRefreshTokens
}