const Products = require("../models/products")
var mongoose = require('mongoose');

const findById = async(id) => {
    const products = await Products.aggregate([{
            "$match": {
                _id: mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "product",
                as: "prices"
            }
        }
    ])

    // if (!products ? .length)
    //     return null

    return products[0]
}

const findAll = async(category = '', item = '') => {
    let matchCond = {};
    if (category) matchCond['category'] = mongoose.Types.ObjectId(category)
    if (item) matchCond['item'] = mongoose.Types.ObjectId(item)

    const products = await Products.aggregate([{
            "$match": matchCond
        },
        {
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "product",
                as: "prices"
            },

        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            },
        },
        {

            $lookup: {
                from: "items",
                localField: "item",
                foreignField: "_id",
                as: "item"
            }
        },
        { "$unwind": "$category" },
        { "$unwind": "$item" },
    ])

    // if (!products ? .length)
    //     return []

    return products
}

const create = async(newProduct) => {
    const createdProduct = await Products.create(newProduct);
    return createdProduct;
}
const update = async(updateProducts) => {
    const { _id, title, category, item, user, imageUrl, desc } = updateProducts;
    const updatenewProducts = await Products.findByIdAndUpdate(_id, {
        title,
        category,
        item,
        user,
        imageUrl,
        desc
    });
    console.log("updated");
    return {
        success: true,
        message: "Update is successfull",
        data: updatenewProducts
    };
}

const remove = async(id) => {
    const removeProducts = await Products.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "delete is successfull",
        data: removeProducts
    };
}

module.exports = {
    findById,
    update,
    remove,
    findAll,
    create
}