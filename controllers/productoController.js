const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
    try {
       let producto;
       producto = new Producto(req.body);

       await producto.save();
       res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear el producto');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
       
       const productos = await Producto.find();
       res.json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener los productos');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({ msg: "No existe el producto en la BD"});
        } 

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({_id: req.params.id}, producto, { new: true});
        res.json(producto);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el producto');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({ msg: "No existe el producto en la BD"});
        } 
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener el producto');
    }
}

exports.eliminarProducto = async (req, res ) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if(!producto){
            res.status(404).json({ msg: "No existe el producto en la BD"});
        } 

        await Producto.findOneAndRemove({_id: req.params.id});
        res.json({ msg: 'Producto eliminado con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el producto');
        
    }
}