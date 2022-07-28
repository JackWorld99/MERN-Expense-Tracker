const model = require('../models/model');
const moment = require('moment')

exports.createCategories = async (req, res) => {
    try {
        const docs = [
            {type: "Expense", color: "#fa4632"},
            {type: "Investment", color: "#fcbe44"},
            {type: "Savings", color: "#04b521"},
            {type: "Insurance", color: "#4997f2"},
            {type: "Charity", color: "#f74dc1"},
        ];
        const Create = await model.categoriesModel.create(docs);
        return res.json(Create);
    }catch(error) {
        res.status(400).json({message: `Error while creating categories ${error}`});
    }
}

exports.getCategories = async (req, res) => {
    let result = await model.categoriesModel.find({});
    let filter = await result.map(data => Object.assign({}, {type: data.type, color: data.color}));
    return res.json(filter);
}

exports.createTranscations = async (req, res) => {
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let {name, type, amount} = req.body;
    const create = await new model.transactionModel({
        name,
        type,
        amount,
        data: new Date()
    });

    create.save(error => {
        if(!error) return res.json(create);
        return res.status(400).json({message: `Error while creating transaction ${error}`});
    })
}

exports.getTranscations = async (req, res) => {
    let data = await model.transactionModel.find({});
    return res.json(data);
}

exports.deleteTranscations = async (req, res) => {
    if(!req.body) res.status(400).json({message: `Request body not found`});

    await model.transactionModel.deleteOne(req.body, error => {
        if(!error) res.json("Record Deleted!");
    }).clone().catch(error => {res.json("Error occur while delete record")})
}

exports.getLabels = async (req, res) => {
    model.transactionModel.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(value => Object.assign({}, {_id: value._id, name: value.name, type: value.type, amount: value.amount, color: value.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Lookup Collection Error")
    })
}

exports.getList = async (req, res) => {
    const resultBody = req.body;
    var weekOrMonth;
    var isClick = false;

    if(resultBody.data == "week"){
        isClick = true;
        weekOrMonth = moment().subtract(7,'d').toDate();
    }

    if(resultBody.data == "month"){
        isClick = true;
        weekOrMonth = moment().subtract(1,'M').format();
    }

    if(isClick){
        model.transactionModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            {$unwind: "$categories_info"},
            {$match: {
                date: { 
                    $gt: weekOrMonth,
                    $lte: moment().toDate()
                },
            }}
        ]).then(result => {
            let data = result.map(value => Object.assign({}, {_id: value._id, name: value.name, type: value.type, amount: value.amount, color: value.categories_info['color'], date: value.date}));
            res.json(data);
        }).catch(error => {
            res.status(400).json("Lookup Collection Error")
        });
    }else{
        model.transactionModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            {$unwind: "$categories_info"},
            {$match: {
                date: { 
                    $gt: moment().subtract(7,'d').toDate(),
                    $lte: moment().toDate()
                },
            }}
        ]).then(result => {
            let data = result.map(value => Object.assign({}, {_id: value._id, name: value.name, type: value.type, amount: value.amount, color: value.categories_info['color'], date: value.date}));
            res.json(data);
        }).catch(error => {
            res.status(400).json("Lookup Collection Error")
        });
    }
}
