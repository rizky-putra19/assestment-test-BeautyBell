const { users, taxObjects, userBills } = require('../models');

module.exports = {
    generateBills: async (req, res) => {
        try {
            const allTaxObject = await taxObjects.findAll({
                where: {
                    userId: req.users.id,
                }
            });

            let countSubTotal = 0;
            let countTaxSubTotal = 0;

            for (let i = 0; i < allTaxObject.length; i++) {
                countSubTotal = countSubTotal + allTaxObject[i].price
                
                if(allTaxObject[i].taxCode == 1) {
                    countTaxSubTotal = countTaxSubTotal + ((10/100)*allTaxObject[i].price)
                } else if (allTaxObject[i].taxCode == 2) {
                    countTaxSubTotal = countTaxSubTotal + (10+((2/100)*allTaxObject[i].price))
                } else if (allTaxObject[i].taxCode == 3 && allTaxObject[i].price > 100) {
                    countTaxSubTotal = countTaxSubTotal + ((1/100)*(allTaxObject[i].price-100))
                } else if (allTaxObject[i].taxCode == 3 && allTaxObject[i].price < 100) {
                    countTaxSubTotal = countTaxSubTotal + allTaxObject[i].price
                }
            }

            let countGrandTotal = countSubTotal + countTaxSubTotal

            await userBills.create({
                subTotal: countSubTotal,
                taxSubTotal: countTaxSubTotal,
                grandTotal: countGrandTotal,
                userId: req.users.id,
            });

            const findBillWithObject = await users.findOne({
                where: {
                    id: req.users.id
                },
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
                include: [
                    {
                        model: taxObjects,
                        as: 'taxObjects',
                        attributes: {
                            exclude: ['userId','createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: userBills,
                        as: 'userBills',
                        attributes: {
                            exclude: ['userId','createdAt', 'updatedAt']
                        },
                    },
                ]
            })
            return res.status(200).json({
                status: 'success',
                message: 'success count bill',
                data: findBillWithObject,
            })
        } catch (error) {
            console.log("🚀 ~ file: userBillsControlllers.js ~ line 66 ~ generateBills: ~ error", error)
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },

    deleteAllBill: async (req, res) => {
        try {
            const deleteItem = await userBills.destroy({
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
                message: 'delete bill success',
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },
}