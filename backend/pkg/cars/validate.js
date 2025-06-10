const { Validator } = require("node-input-validator");

const CarPOST = {
    brand: "required|string",
    model: "required|string",
    year: "required|integer"
};

const CarPUT = {
    brand: "string",
    model: "string",
    year: "integer"
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if (!e) {
        throw {
            code: 400,
            error: v.errors,
        };
    }
};

module.exports = {
    CarPOST,
    CarPUT,
    validate,
};
