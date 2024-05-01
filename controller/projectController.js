const project = require("../db/models/project");
const catchAsync = require("../utils/catchAsync");

const createProject = catchAsync(async (req,res, next)=>{
    const body = req.body;

    const newProject = await project.create()
});

module.exports = createProject;