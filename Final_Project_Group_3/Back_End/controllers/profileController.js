// import from helpers
const { asyncQuery, generateQuery } = require('../helpers/queryHelp')

module.exports = {
    editProfile: async (req, res) => {
        const { location_id, address } = req.body
        // console.log(req.body)

        const editQuery = `UPDATE profile SET${generateQuery(req.body)} WHERE id_user = ${parseInt(req.params.id)}`
        
        try {
            const result = await asyncQuery(editQuery)

            res.status(200).send(result)
        }
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
        // res.status(200).send('test edit profile')
    },

    uploadFile: async (req, res) => {
        const id = parseInt(req.params.id)

        console.log('req file', req.file)

        if (!req.file) return res.status(400).send('NO IMAGE')

        try {
            const updatePict = `UPDATE profile SET profile_pic = 'images/${req.file.filename}' 
                                WHERE id_users = ${id}`
            const result = await asyncQuery(updatePict)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },

    uploadPayment: async (req, res) => {
        const id = parseInt(req.params.id)

        console.log('req file', req.file)

        if (!req.file) return res.status(400).send('NO IMAGE')

        try {
            const updatePict = `UPDATE profile SET profile_pic = 'images/${req.file.filename}' 
                                WHERE id_users = ${id}`
            const result = await asyncQuery(updatePict)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },

    getUserLocation: async(req, res) => {
        try{
            const query = `SELECT * FROM user_location`
            const result = await asyncQuery(query)

            res.status(200).send(result)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}