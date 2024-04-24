const user = require("../db/models/user");

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

    if(!newUser){
        return res.status(404).json({
            status: 'Fail',
            message: 'User can not be created'
        })
    }

    return res.status(201).json({
        status: 'Success',
        data: newUser,
    })
};


module.exports = { signup };