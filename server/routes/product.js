var express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const {} = require('../schemas');
var router = express.Router();

const productService = require('../services/product');

router.get('/id/:id', auth.ensureSignedIn, async function(req, res, next) {
    const { id } = req.params;
    const result = await productService.findById(id);
    res.json(result);
})

// all
router.get('/all/:category?/:item?', async(req, res) => {
    const { category, item } = req.params;
    const result = await productService.findAll(category, item);
    res.json(result);
})

router.post('/create', auth.ensureSignedIn, async(req, res, ) => {
    const { title, category, item, user, imageUrl, desc, } = req.body;

    const result = await productService.create({
        title,
        category,
        item,
        user,
        imageUrl,
        desc,
    })
    res.json(result);
})

router.post('/update', auth.ensureSignedIn, async(req, res, next) => {
    const { _id, title, category, item, user, imageUrl, desc } = req.body;
    const result = await productService.update({ _id, title, category, item, user, imageUrl, desc });
    res.json(result);
})


router.post('/delete', auth.ensureSignedIn, async(req, res, next) => {
    const { _id } = req.body;
    const result = await productService.remove(_id);
    res.json(result);
})
module.exports = router