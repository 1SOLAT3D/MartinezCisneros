const validation =(schema) => {
    let joiValidation = (req, res, next) => {
        let {error} = schema.validate(req.body, {abortEarly: false})
    };
    console.log(Error);
    if (Error){
        res.status(422).json({Error, details})
    }
    else{
        next();
    }
    return joiValidation;
}

module.exports = validation;