const mongoose = require('mongoose');

const categories = new mongoose.Schema({
    type: {type: String, default: 'Investment'},
    color: {type: String, default: '#FCBE44'}
});

const transactions = new mongoose.Schema({
    name: {type: String, default: 'Anonymous'}, 
    type: {type: String, default: 'Investment'},
    amount: {type: Number},
    date: {type: Date, default: Date.now}
});

const categoriesModel = mongoose.model('categories', categories)
const transactionModel = mongoose.model('transactions', transactions)

exports.default = transactionModel;
module.exports = {
    categoriesModel,
    transactionModel
}