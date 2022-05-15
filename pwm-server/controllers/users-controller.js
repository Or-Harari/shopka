const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
           new HttpError('Invalid inputs', 422)
        )    
    }
    let existingUser;
    try{
         existingUser = await User.findOne({name: req.body.name})
    }catch(err){
        const error = new HttpError(
            'Signing up failed',
            500
        );
        res.status(500).json(error);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError(
            'User already exist',
            422
        );
        res.status(422).json(error);
        return next(error);
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(req.body.password, 12)
    }catch(err){
        const error = new HttpError('Could not create user', 500);
        return next(error);
    }
    

    const createdUser = new User({
        name: req.body.name,
        password: hashedPassword,
        favorites: []
    })
    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError(
            'Could not add user',
            500
        );
        res.json({error:'Could not add user'});
        return next(error);
    }

    let token;
    token = jwt.sign({userId: createdUser.id, userName: createdUser.name}, 'supersecret_dont_share', {expiresIn:'1h'});
    res.status(201).json({userId:createdUser.id, userName:createdUser.name, token:token});
}

const login = async (req, res, next) => {
    let identifiedUser;
    try{
        identifiedUser = await User.findOne({name:req.body.name});
    }catch (err){
        const error = new HttpError(
            'Could not find user',
            500
        );
        res.status(500).json(error);
        return next(error);
    }
    if(!identifiedUser){
        const error = new HttpError(
            'Invalid userName or password',
            401
        );
        res.status(401).json(error);
        return next(error);
    }

    let isValidPassword = false;
    if(req.body.password){
        try{
            isValidPassword = await bcrypt.compare(req.body.password, identifiedUser.password)
            }catch(err){
                const error = new HttpError('Could not log you in', 500);
                return next(error)
            }
            if(!isValidPassword){
                const error = new HttpError(
                    'Invalid userName or password',
                    401
                );
                res.status(401).json(error);
                return next(error);
            }
    }

        let token;
        token = jwt.sign({userId: identifiedUser.id, userName: identifiedUser.name}, 'supersecret_dont_share', {expiresIn:'1h'});

    res.json({
        UserId: identifiedUser.id,
        userName: identifiedUser.name,
        favorites: identifiedUser.favorites,
        token: token
    }); 
}

const addToWatch = async (req, res, next)=>{
            
            await User.findOneAndUpdate(
                { name: req.body.name },
                { $push: { favorites: req.body.id}}
             )
        
        res.json({status:'ok'})
}

const removeFromWatch = async (req, res, next) => {
     let userFavorite
    try{
       userFavorite = await User.find({name: req.body.name });
       if(!userFavorite){
           throw new Error();
       }
       else{
           await User.updateOne({ name: req.body.name },
            { $pull: { favorites: req.body.favoriteId  }});
        res.json('Item deleted');
       }
    }catch (err){
        const error = new HttpError('could not delete favorite')
        return next(error);
    }
   
}
const getUserFavorites = async (req,res, next) => {
    let user;
    let fav
    try{
       user =  await User.findOne({name :req.body.name})
     
    }catch (err){
        res.json(err);
    }
    if(user){
        console.log(user);
         fav = user.favorites;
    }else{
        res.json('Coulndnt get favorites')
    }
    res.json(fav)
}

exports.signUp = signUp;
exports.login = login;
exports.addToWatch = addToWatch;
exports.removeFromWatch = removeFromWatch;
exports.getUserFavorites = getUserFavorites;