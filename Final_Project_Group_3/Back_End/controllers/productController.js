const db = require('../database')

const { generateQuery, asyncQuery } = require('../helpers/queryHelp')

module.exports = {
    getProd: async(req, res) => {
        try{
            const queryProduct = `SELECT main.*, GROUP_CONCAT(pi.image separator ',') images FROM (SELECT p.id, p.name, pc.category, p.description, p.price, SUM(w.available) total_stock FROM products p 
            JOIN product_category pc ON p.category_id = pc.id
            JOIN warehouse w ON p.id = w.product_id  
            GROUP BY p.id) main 
            JOIN product_img pi ON main.id = pi.product_id 
            GROUP BY main.id`
            const productResult = await asyncQuery(queryProduct)
            productResult.map(item => item.images = item.images.split(','))

            res.status(200).send(productResult)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },

    getCarousel: async(req, res) => {
        try{
            const queryCarousel = `SELECT * FROM carousel`
            const result = await asyncQuery(queryCarousel)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },

    getProductDetail: async(req, res) => {
        try{
            const queryPaid = `SELECT sum(od.quantity) quantity FROM order_details od 
            JOIN orders o ON od.order_number = o.order_number 
            WHERE o.status = 3 AND od.id_product = ${+req.params.id} 
            GROUP BY od.id_product`
            const result = await asyncQuery(queryPaid)
            const qtyPaid = result.length === 0 ? 0 : result[0].quantity

            const queryDetail = `SELECT p.*, (w.total_stock - ${qtyPaid}) total_stock, GROUP_CONCAT(pi.image separator ', ') images FROM products p 
            JOIN product_img pi ON p.id = pi.product_id
            JOIN (SELECT product_id, sum(stock) total_stock FROM warehouse group by product_id) w ON p.id = w.product_id 
            WHERE p.id = ${+req.params.id}
            GROUP BY p.id`
            const result2 = await asyncQuery(queryDetail)
            result2.map(item => item.images = item.images.split(','))

            res.status(200).send(result2)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}