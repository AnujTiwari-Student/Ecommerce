const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedin')
const productModel = require('../models/product')

router.get('/', (req , res)=>{
    let error = req.flash("error")
    res.render('index' , {error})
})

router.get('/shop', isLoggedIn, async function (req, res) {
    try {
        let products = await productModel.find();
        
        if (!products || products.length === 0) {
            console.log("No products found");
            return res.render("shop", { products: [] }); 
        }

        res.render("shop", { products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;