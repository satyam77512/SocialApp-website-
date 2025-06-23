const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// Define storage with dynamic destination
const storage = multer.diskStorage({

    // destination: function (req, file, cb) {
    //     // Check the file type
    //     const ext = path.extname(file.originalname).toLowerCase();
        
    //     if (ext === '.pdf') {
    //         cb(null, './Public/Resume'); // For PDFs, store in /Public/Resume
    //     } else {
    //         cb(null, './Public/Images'); // For other file types, store in /Public/Images
    //     }
    // },
    
    filename: function (req, file, cb) {
        // Generate a random filename with the same extension
        crypto.randomBytes(15, (err, bytes) => {
            if (err) return cb(err); // Handle errors if any
            const fn = bytes.toString('hex') + path.extname(file.originalname);
            cb(null, fn);
        });
    }
});

// Create the upload instance
const upload = multer({ storage: storage });

const uploadMiddleware = upload.fields([
    {name:'postImage',maxCount: 1},
]);

module.exports = uploadMiddleware;

