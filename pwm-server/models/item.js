const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const itemsSchema = new Schema ({
    img: { type: String, required: true},
    title:{ type: String, required: true},
    rate:{ type: Number, required: true},
    price:{ type: Number, required: true},
    description:{ type: String, required: true}
});

itemsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Items', itemsSchema);