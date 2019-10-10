let express = require('express');
let app = express();
var router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tasks_main');
let conn = mongoose.connection;
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
let gfs = Grid(conn.db);

// Setting up the storage element
let storage = GridFsStorage({
    gfs: gfs,

    filename: (req, file, cb) => {
        let date = Date.now();
        // The way you want to store your file in database
        //cb(null, file.fieldname + '-' + date + '.');
        cb(null, file.originalname.split('.')[0]);
    },

    // Additional Meta-data that you want to store
    metadata: function(req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'ctFiles' // Root collection name
});

// Multer configuration for single file uploads
let upload = multer({
    storage: storage
}).single('file');

// Route for file upload
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, error_desc: null, file_uploaded: true });
    });
});

// Downloading a single file
router.get('/file', (req, res) => {
    const { name } = req.query;
    gfs.collection('ctFiles'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({ filename: name }).toArray(function(err, files) {
        if (!files || files.length === 0) {
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType);

        // Return response
        return readstream.pipe(res);
    });
});

// Route for getting all the files
router.get('/files', (req, res) => {
    let filesData = [];
    let count = 0;
    gfs.collection('ctFiles'); // set the collection to look up into

    gfs.files.find({}).toArray((err, files) => {
        // Error checking
        if (!files || files.length === 0) {
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // Loop through all the files and fetch the necessary information
        files.forEach((file) => {
            filesData[count++] = {
                originalname: file.metadata.originalname,
                filename: file.filename,
                contentType: file.contentType
            }
        });
        res.json(filesData);
    });
});

// Delete file
router.delete("/file", function(req, res) {
    const { name } = req.query;

    gfs.remove({ filename: name, root: 'ctFiles' }, function(err) {
        if (err) {
            res.send(err);
        }

        res.send({
            success: true,
            message: 'ok'
        });
    });
});

module.exports = router;