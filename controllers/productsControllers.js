const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const Products = require('../models/Products');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({message: error});
        } else{
            return next();
        }

    });
};

// agregar producto
exports.add = async(req, res, next) => {
    const products = new Products(req.body);

    try {
        if (req.file && req.file.filename) {
            products.image = req.file.filename;
        }
        await products.save();
        res.json({message: 'Nuevo producto agregado!'});
    }catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                message: `Ya existe un producto con el sku: ${req.body.sku}`,
            });
        } else{
            res.status(400).json({
                message: 'Error al procesar la peticion'
            });
        }
    }

}



// listar productos
exports.list = async (req,res) => {
    try{
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
        // next();
    }
};

// leer productos por id
exports.show = async (req, res, next) => {
    try {
        const products =await Products.findById(req.params.id);
        if (!products){
            res.status(404).json({
                message: 'El producto no existe'
            });
        }else
        res.status(200).json(products);
    }catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });

    }
}

// actualizar producto
exports.update = async (req, res, next) => {
    try {
        let newProduct = req.body;
        if (req.file && req.file.filename) {
            newProduct.image = req.file.filename;
        } else {
            const product = await Products.findById(req.params.id);
            newProduct.image = product.image;
        }
        const productUpdated = await Products.findOneAndUpdate(
            {_id: req.params.id},
            newProduct,
            { new: true }
        );
        res.json({
            message:'Producto actualizado correctamente'
        })
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                message: `Ya existe un producto con el sku: ${req.body.sku}`,
            });
        } else {
            res.status(400).json({
                message: 'Error al procesar la peticion'
            
            });
        }
    }
}

// eliminar producto
exports.delete = async (req, res, next) => {
    try {
        await Products.findOneAndDelete({_id: req.params.id});
        res.json({message: 'El producto ha sido eliminado'});
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}