const express = require('express')
const port = 5000
var bodyParser = require('body-parser')
const app = express()
const multer = require('multer')

//CORS
const cors = require('cors');
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/fileupload',upload.single('file'),	(req, res) => {
     const formData = req.body;
  console.log('form data', formData);
 res.status(200).json({ data: 'data' })
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
