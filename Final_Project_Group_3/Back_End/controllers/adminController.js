const { asyncQuery } = require('../helpers/queryHelp')
const db = require('../database')

module.exports = {
    getProductStock: async(req, res) => {
        try{
            const allProdQuery = `SELECT w.id_warehouse, p.id, p.name, wl.location, 
            w.booked, w.available, w.stock FROM warehouse w
            JOIN warehouse_loc wl ON w.location_id = wl.id 
            JOIN products p ON w.product_id = p.id
            ORDER BY p.id`
            const result = await asyncQuery(allProdQuery)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editProductStock: async(req, res) => {
        const { id_product, warehouse } = req.body
        try{
            for await (item of warehouse) {
                let query
                if(item.location === 'Jakarta') {
                    query = `UPDATE warehouse SET stock = ${item.stock}, available = (${item.stock} - booked) WHERE product_id = ${+id_product} AND location_id = 1`
                }
                if(item.location === 'Medan') {
                    query = `UPDATE warehouse SET stock = ${item.stock}, available = (${item.stock} - booked) WHERE product_id = ${+id_product} AND location_id = 2`
                }
                if(item.location === 'Surabaya') {
                    query = `UPDATE warehouse SET stock = ${item.stock}, available = (${item.stock} - booked) WHERE product_id = ${+id_product} AND location_id = 3`
                }
                
                await asyncQuery(query) 
            }

            res.status(200).send("edit stock success")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getAll: async(req, res) => {
        try{
            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id  
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getJakarta: async(req, res) => {
        try{
            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id
            WHERE w.location_id = 1
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getMedan: async(req, res) => {
        try{
            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id
            WHERE w.location_id = 2
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getSurabaya: async(req, res) => {
        try{
            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id
            WHERE w.location_id = 3
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    adminPaymentConfirmation: async (req, res) => {
        const order_number = req.params.order_number
        const status = req.body.status
        try {
            const queryPaymentConf = `UPDATE orders SET status = ${db.escape(status)} WHERE (order_number = ${db.escape(order_number)})`
            const result = await asyncQuery(queryPaymentConf)
            console.log(result)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getCategory: async(req, res) => {
        try{
            const cate = `SELECT * FROM product_category`
            const result = await asyncQuery(cate)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addCategory: async(req, res) => {
        let {category} = req.body

        try{
            const cate = `INSERT INTO product_category (category) VALUES ('${category}')`
            const result = await asyncQuery(cate)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteCategory: async(req, res) => {
        let {id} = req.body

        try{
            const cate = `DELETE FROM product_category WHERE id = ${parseInt(id)}`
            const result = await asyncQuery(cate)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    adminCancelOrder: async (req, res) => {
        const order_number = req.params.order_number
        const message = req.body.message
        try {
            const queryPaymentConf = `UPDATE orders SET message = ${db.escape(message)} WHERE (order_number = ${db.escape(order_number)})`
            const result = await asyncQuery(queryPaymentConf)
            console.log(result)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    editCategory: async(req, res) => {
        let {category, id} = req.body

        try{
            const cate = `UPDATE product_category SET category = '${category}' WHERE id = ${parseInt(id)}`
            const result = await asyncQuery(cate)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editJakarta: async (req, res) => {
        const { product_id, stock } = req.body

        try {
            const editStock = `UPDATE warehouse SET stock = ${parseInt(stock)}, available = (${parseInt(stock)} - booked)
            WHERE product_id = ${parseInt(product_id)} AND location_id = 1`
            await asyncQuery(editStock)

            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id
            WHERE w.location_id = 1
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    editMedan: async (req, res) => {
        const { product_id, stock } = req.body

        try {
            const editStock = `UPDATE warehouse SET stock = ${parseInt(stock)}, available = (${parseInt(stock)} - booked)
            WHERE product_id = ${parseInt(product_id)} AND location_id = 2`
            await asyncQuery(editStock)

            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id
            WHERE w.location_id = 2
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    editSurabaya: async (req, res) => {
        const { product_id, stock } = req.body

        try {
            const editStock = `UPDATE warehouse SET stock = ${parseInt(stock)}, available = (${parseInt(stock)} - booked)
            WHERE product_id = ${parseInt(product_id)} AND location_id = 3`
            await asyncQuery(editStock)

            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id
            WHERE w.location_id = 3
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    editProduct: async (req, res) => {
        const { name, category_id, price, product_id} = req.body

        try {
            const editProduct = `UPDATE products SET name = '${name}', category_id = ${parseInt(category_id)}, price = ${parseInt(price)}
            WHERE id = ${parseInt(product_id)}`
            await asyncQuery(editProduct)

            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id  
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteProduct: async(req, res) => {
        let {id} = req.body

        try{
            const delProduct = `DELETE FROM products WHERE id = ${parseInt(id)}`
            const result = await asyncQuery(delProduct)

            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.stock) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id  
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)

            res.status(200).send(productResult)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    
    addProduct: async(req, res) => {
        let {name, cate, price, description, image } = req.body

        try{
            const add = `INSERT INTO products (name, category_id, description, price) VALUES ('${name}', ${parseInt(cate)}, '${description}', ${parseInt(price)})`
            const result = await asyncQuery(add)

            const add2 = `INSERT INTO warehouse (product_id, location_id) VALUES (${result.insertId}, 1), (${result.insertId},2), (${result.insertId},3)`
            const result2 = await asyncQuery(add2)
            
            const add3 = `INSERT INTO product_img (product_id, image) VALUES (${result.insertId}, '${image}')`
            const result3 = await asyncQuery(add3)

            res.status(200).send('add success')
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}