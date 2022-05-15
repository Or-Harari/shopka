const HttpError = require('../models/http-error');
const itemModel = require('../models/item');
const {validationResult} = require('express-validator');
 
const db = itemModel;

const getAllItems = (req, res, next) => {
        const getAllData = async ()=>{
            let items;
            try{
                items = await db.find({})
            }catch(err){
                const error = new HttpError('problem', 500)
                return next(error)
            }
            res.json(items)
        }
        getAllData()
}

const createItem = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
             HttpError('invalid input passed', 422)    
        )
    }
    const item = new itemModel ({
        img:'https://cdn.djcity.com.au/wp-content/uploads/2020/12/25155608/Fenton-RP112L-Record-Player-with-BT-and-Built-In-Speakers-Light-Wood-1.jpg',
        title: req.body.title,
        rate: req.body.rate,
        price: req.body.price,
        description: req.body.description
    });
    try{
        await item.save();
    }catch (err) {
        const error = new HttpError(
            'Crate item failed',
            500
        );
        return next(error);
    }
    res.status(201).json({item: item});
}

const UpdateUserRating = async (req,res,next) => {
        await db.updateOne({_id: req.body._id},{rate:  req.body.rate})
        res.json({status:'ok'})
}


exports.getAllItems = getAllItems;
exports.createItem = createItem;
exports.UpdateUserRating = UpdateUserRating;