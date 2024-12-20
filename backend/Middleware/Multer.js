const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req,file,cb)=>{
    const allowedTypes = ["image/jpeg","image/png","image/gif"];
    if (allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Invalid file type, please try jpeg,png or gif files."))
    }
};

const upload =multer({storage,fileFilter})

module.exports =upload;