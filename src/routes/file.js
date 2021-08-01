const fs = require('fs');
const File = require('../models/file');
const path = require('path');
const router = require('express').Router();
const upload = require('../middlewares/upload');

router.post('', upload.single('file'), async (req, res) => {
  const file = new File();
  file.subject = req.query.subject;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    file.name = req.file.originalname;
    file.filename = req.file.filename;
    file.src = url + '/files/' + req.file.filename;
    file.type = req.file.originalname.split('.').slice(-1)[0];
  } else {
    file.src = req.body.link;
    file.type = 'link';
  }
  const data = await file.save();
  res.send(data);
});

router.delete('/:id', async (req, res) => {
  const file = await File.findById(req.params.id);
  if (file.type === 'link') {
    await file.remove();
    return res.send();
  }
  try {
    fs.unlinkSync(path.join(__dirname, '../files/', file.filename));
    await file.remove();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get('/:subject', async (req, res) => {
  const files = await File.find({ subject: req.params.subject });
  res.send(files);
});

router.get('/download/:name', (req, res) => {
  res.download(path.join(__dirname, '../files/', req.params.name), err => {
    console.log(err);
    res.status(404).send();
  });
});

module.exports = router;
