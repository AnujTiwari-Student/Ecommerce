const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedin')
const productModel = require('../models/product')
const userModel = require('../models/user')

router.get('/', (req , res)=>{
    let error = req.flash("error")
    res.render('index' , {error , loggedin: false})
})

router.get('/addtocart/:id', isLoggedIn ,async (req , res)=>{
    try{
        const productId = req.params.id;
        let user = await userModel.findOne({email: req.user.email});
        // console.log(user)
        const cartItem = user.cart.find(item => item.product.toString() === productId);
        // console.log(cartItem)

            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                user.cart.push({ product: productId, quantity: 1 });
            }
        // user.cart.push(req.params.id)
        await user.save();
        req.flash("success" , "Added to cart")
        res.redirect('/shop')
    }
    catch(err){
        req.flash("error" , "Error while adding to cart")
        res.redirect('/shop')
    }
})

router.get('/cart', isLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({email: req.user.email}).populate('cart.product')
        // console.log(user.cart.product)
        let totalMRP = 0;
        let totalDiscount = 0;

        user.cart.forEach((item) => {
            if (item.product) {
                totalMRP += item.product.price * item.quantity; 
                totalDiscount += item.product.discount * item.quantity;
            }
        });

        const platformFee = 20; 
        const shippingFee = totalMRP > 500 ? 0 : 50; 

        const totalAmount = totalMRP - totalDiscount + platformFee + shippingFee;

        res.render("cart" , {
            user,
            totalMRP,
            totalDiscount,
            platformFee,
            shippingFee,
            totalAmount,
        });
    } catch (error) {
        req.flash("error" , "error while fetching cart")
        res.redirect('/shop')
    }
});

router.get('/shop', isLoggedIn, async function (req, res) {
    try {
        let products = await productModel.find();
        
        if (!products || products.length === 0) {
            console.log("No products found");
            return res.render("shop", { products: [] }); 
        }
        let success = req.flash("success")
        res.render("shop", { products , success });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;