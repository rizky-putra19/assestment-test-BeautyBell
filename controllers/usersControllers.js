const { users } = require('../models')
const Joi  = require('joi');
const { encrypt, comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = {
    signup: async (req, res) => {
        const body = req.body;

        try{
            const schema = Joi.object({
                username: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            });

            const check = schema.validate({
                username: body.username,
                email: body.email,
                password: body.password,
            })

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            };

            const checkUser = await users.findOne({
                where: {
                    email: body.email
                }
            });

            if(checkUser) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'email already use'
                })
            };

            const registUser = await users.create({
                username: body.username,
                email: body.email,
                password: encrypt(body.password)
            })

            const payloads = {
                id: registUser.dataValues.id,
                email: registUser.dataValues.email,
                username: registUser.dataValues.username,
            }

            const token = generateToken(payloads);

            return res.status(200).json({
                status: 'success',
                message: 'signup succesfully',
                token: token,
                dataUser: payloads,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },

    signin: async (req, res) => {
        const body = req.body;

        try{
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            });

            const check = schema.validate({
                email: body.email,
                password: body.password,
            })

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            };

            const checkEmail = await users.findOne({
                where: {
                    email: body.email,
                }
            });

            if(!checkEmail) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'please signup first'
                })
            };

            const checkPass = comparePass(body.password, checkEmail.dataValues.password);

            if(!checkPass) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'wrong password'
                })
            };

            const payloads = {
                id: checkEmail.dataValues.id,
                email: checkEmail.dataValues.email,
                username: checkEmail.dataValues.username,
            }

            const token = generateToken(payloads);

            return res.status(200).json({
                status: 'success',
                message: 'login successfully',
                token: token,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },

    deleteAccount: async (req, res) => {
        try {
            const findUser = await users.findOne({
                where: {
                    id: req.users.id
                }
            });

            if(!findUser) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            };

            await users.destroy({
                where: {
                    id: req.users.id
                }
            });

            return res.status(200).json({
                status: 'success',
                message: 'delete account successfully'
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },
}