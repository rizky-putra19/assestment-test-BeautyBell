const { users, taxObjects, userBills } = require('../models');
const Joi = require('joi');

module.exports = {
    inputItem: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                taxCode: Joi.number().required(),
                price: Joi.number().required(),
            });

            const check = schema.validate({
                name: body.name,
                taxCode: body.taxCode,
                price: body.price,
            });

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            };

            const createData = await taxObjects.create({
                name: body.name,
                taxCode: body.taxCode,
                price: body.price,
                userId: req.users.id,
            })

            if(!createData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'unable to input data',
                })
            }

            return res.status(200).json({
                status: 'success',
                message: 'success input tax object',
                data: createData
            })

            
    } catch(error) {
        return res.status(500).json({
            status: 'failed',
            message: 'internal server error'
        });
    }
},

    deleteObjectById: async (req, res) => {
        try {
            const deleteItem = await taxObjects.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (!deleteItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found'
                })
            };

            return res.status(200).json({
                status: 'success',
                message: 'delete object success',
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },

    deleteAllObject: async (req, res) => {
        try {
            const deleteItem = await taxObjects.destroy({
                where: {
                    userId: req.users.id
                }
            });

            if (!deleteItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found'
                })
            };

            return res.status(200).json({
                status: 'success',
                message: 'delete object success',
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },
}