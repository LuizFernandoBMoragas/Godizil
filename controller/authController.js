const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config({path: `${process.cwd()}/env`});

const generateToken = (payload) => {
    return jwt.sign(payload, 'very-long-secret-key-luizmoragas', {
        expiresIn: '90d',
    })
}

const signup = async (req, res, next) =>{
    const body = req.body;
    
    if(!['1', '2'].includes(body.userType)){
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid user type',
        })
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
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
            message: 'User can not be created',
        })
    }

    return res.status(201).json({
        status: 'Success',
        data: result,
    })
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            status: 'Fail',
            message: 'Please provide email and password',
        });
    }
    
    const result = await user.findOne({where: { email }});
    if(!result || !(await bcrypt.compare(password, result.password))){
        return res.status(401).json({
            status: 'Fail',
            message: 'Incorrect email or password',
        });
    }

    const token = generateToken({
        id: result.id
    });

    return res.json({
        status: 'Sucess',
        token,
    })
}

module.exports = { signup, login };