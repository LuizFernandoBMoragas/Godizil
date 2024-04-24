const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
require('dotenv').config({path: `${process.cwd()}/env`});

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const signup = async (req, res, next) =>{
    const body = req.body;
    
    if(!['1', '2'].includes(body.userType)){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid user type'
        })
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword
    });

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    })

    if(!result){
        return res.status(404).json({
            status: 'Fail',
            message: 'User can not be created'
        })
    }

    return res.status(201).json({
        status: 'Success',
        data: result,
    })
};


module.exports = { signup };