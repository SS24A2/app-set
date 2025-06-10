const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: String,
    year: Number,
});

const CarModel = mongoose.model("Car", carSchema, "cars");

const get = async () => {
    return await CarModel.find();
};

const create = async (data) => {
    // CarModel.create()
    const newCar = new CarModel(data);
    return await newCar.save();
};

const update = async (id, data) => {
    return await CarModel.updateOne({ _id: id }, data);
};

const remove = async (id) => {
    return await CarModel.deleteOne({ _id: id });
};

module.exports = {
    get,
    create,
    update,
    remove,
};