const Items = require("../models/items");

const findById = async(id) => {
    try {
        return {
            success: true,
            data: {}
        };
    } catch (err) {
        return {
            success: false,
            error: err || 'error'
        }
    }
}

const findAll = async() => {
    return await Items.find().populate('category');
}

const create = async(newItem) => {
    const createItem = await Items.create(newItem);
    return {
        success: true,
        message: "Create Item successfull",
        data: createItem
    };
}

const update = async(updateItem) => {

    const { _id, name, desc, imageUrl } = updateItem;
    const updatenewItem = await Items.findByIdAndUpdate(_id, {
        name: name,
        desc: desc,
        imageUrl: imageUrl
    });
    return {
        success: true,
        message: "Update Item successfull",
        data: updatenewItem
    };

}

const remove = async(id) => {
    const removeItem = await Items.findByIdAndRemove(id);
    console.log("Removed");
    return {
        success: true,
        message: "delete is successfull",
        data: removeItem
    };
}

module.exports = {
    findById,
    update,
    remove,
    findAll,
    create,
}