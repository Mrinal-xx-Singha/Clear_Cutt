import multer from "multer"

// Creating multer middleware for parsing form data
//* Multer.diskStorage -> defines how files are stored on the server

const storage = multer.diskStorage({
    filename: function(re,file,callback){
        //* Datenow() ensures unique filenames to prevent overwriting
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

// initializes multer with the custom storage configuration

const upload = multer({storage})

export default upload