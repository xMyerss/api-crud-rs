const Orders = require('../models/Orders');

exports.add = async (req, res, next) => {
    try {
        const order = new Orders(req.body);
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};

exports.list = async (req, res, next) => {
    try {
        const orders = await Orders.find({})
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'products'
        });

        res.json(orders);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};


exports.show = async (req, res, next) => {
    try {
        const order = await Orders.findById(req.params.id)
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'products'
        });

        if (!order) {
            res.status(404).json({message: 'La orden no existe'});
            next();
        }

        res.json(order); 
        

    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}

exports.update = async (req, res, next) => {
    try {
        const order = await Orders.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true},
        )
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'products'
        });

        res.json(order);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}