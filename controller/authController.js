const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const serverError = require("../utils/serverError");

require('dotenv').config({path: `${process.cwd()}/env`});

const generateToken = (payload) => {
    return jwt.sign(payload, 'very-long-secret-key-luizmoragas', {
        expiresIn: '90d',
    })
}

const signup = catchAsync(async (req, res, next) =>{
    const body = req.body;
    
    if(!['1', '2'].includes(body.userType)){
        throw new serverError('Invalid user type', 400)
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
    });

    if(!newUser){
        throw new serverError('Failed to creat the user', 400);
    }

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    });

    return res.status(201).json({
        status: 'Success',
        data: result,
    });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new serverError('Please provide email and password', 400);
    }
    
    const result = await user.findOne({where: { email }});
    if(!result || !(await bcrypt.compare(password, result.password))){
        throw new serverError('Incorrect email or password', 401);
    }

    const token = generateToken({
        id: result.id
    });

    return res.json({
        status: 'Sucess',
        token,
    })
});

module.exports = { signup, login };