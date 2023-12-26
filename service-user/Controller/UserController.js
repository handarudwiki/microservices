const {User, RefreshToken} = require('../models');
const bcrypt = require('bcrypt');
const validator  = require('fastest-validator');
// const { where } = require('sequelize');
// const { Where } = require('sequelize/types/utils');
const v = new validator()

const register = async (req, res) => {
    try {
        const schema = {
            name : 'string|empty:false',
            email : 'email|empty:false',
            password : 'string|empty:false|min:6',
            profession : 'string|optional'
        }

        const validate = v.validate(req.body, schema)

        if(validate.length){
            return res.status(400).json({
                status : 'error',
                message : validate
            })
        }
        // return res.json(await User.findAll())
        const user = await User.findOne({
            where: {email : req.body.email}
        })

        if(user){
            return res.status(400).json({
                status : 'error',
                message : 'username has already been taken'
            })
        }

        const savedUser = await User.create({
            email : req.body.email,
            name : req.body.name,
            password : await bcrypt.hash(req.body.password, 10),
            profession : req.body.profession,
            role : 'student'
        })

        return res.status(200).json({
            status : 'success',
            data : {
                id : savedUser.id,
                name : savedUser.name,
                email : savedUser.email,
                profession : savedUser.profession
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message : error.message
        })
    }
}

const login = async (req,res) => {
    try {
        schema = {
            email : 'email|empty:false',
            password : 'string|empty:false'
        }

        const validate = v.validate(req.body, schema)

        if(validate.length){
            return res.status(400).json({
                status : 'error',
                message : validate
            })
        }

        const user = await User.findOne({where:{email: req.body.email}})

        if(!user){
            return res.status(403).json({
                status : 'error',
                message : 'username or password wrong'
            })
        }

        const validUser = bcrypt.compare(req.body.email, user.email)

        if(!validUser){
            return res.status(403).json({
                status : 'error',
                message : 'username or password wrong'
            })
        }

        return res.status(200).json({
            status : 'success',
            data : {
                id : user.id,
                name : user.name,
                email : user.email,
                profession : user.profession,
            }
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id);


        if(!user) {
            return res.status(404).json({
                status : 'error',
                message : 'User not found'
            })
        }

        schema = {
            name : 'string|empty:false',
            email : 'email|empty:false',
            password : 'string|empty:false|min:6',
            profession : 'string|optional',
            avatar : 'string|optional',
        }

        const validate = v.validate(req.body, schema);

        if(validate.length) {
            return res.status(400).json({
                status : 'error',
                message : validate
            })
        }

        const email = req.body.email
        if(email) {
            const checkEmail = await User.findOne({
                where : { email }
            })

            if(checkEmail && email!== user.email){
                return res.status(409).json({
                    status : 'error',
                    message : 'email has already been taken'
                })
            }
        }
        // return res.json(req.body.password)
        const updatedUser = await user.update({
            name : req.body.name,
            email : req.body.email,
            password : await bcrypt.hash(req.body.password,10),
            profession : req.body.profession,
            avatar : req.body.avatar
        })

        return res.status(200).json({
            status : 'success',
            data : {
                id : updatedUser.id,
                name : updatedUser.name,
                email : updatedUser.email,
                profession : updatedUser.profession,
                avatar : updatedUser.avatar
            }
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({
            where : {id},
            attributes: {
                exclude: ['password'] // Menyertakan semua atribut kecuali 'password'
            }
        })

        if(!user) {
            return res.status(404).json({
                status : 'error',
                message : 'User not found'
            })
        }

        return res.status(200).json({
            status : 'success',
            data : {
                id : user.id,
                name : user.name,
                email : user.email,
                password : user.password,
                role : user.role,
                profession : user.profession,
                avatar : user.avatar
            }
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const usersId = req.query.user_ids ? req.query.user_ids : null;

        const users = await User.findAll({ where: {id:usersId}});

        const formattedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            profession: user.profession,
            avatar: user.avatar
        }));

        return res.status(200).json({
            status: 'success',
            data: formattedUsers
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const user = await User.findByPk(user_id)

        if(!user){
            return res.status(404).json({
                status : 'error',
                message : 'User not found'
            })
        }

        await RefreshToken.destroy({where : {user_id : user.id}})

        return res.status(200).json({
            message : 'logout successful'
        })
    } catch (error) {
        return res.status(500).json({
            status : 'success',
            message : error.message
        })
    }
}


module.exports = {
    register,
    login,
    logout,
    update,
    getUser,
    getAllUsers,
}