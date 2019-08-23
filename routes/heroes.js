var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Hero = mongoose.model('Hero');



/* GET users listing. */
router.get('/api/heroes', function (req, res, next) {

  Hero.find((err, doc) => {
    if (err) console.log("Error while fetching heroes");
    res.send(doc);
  })
});

router.post('/api/heroes/addHero', (req, res) => {
  insertRecord(req, res);
});

router.put('/api/heroes/updateHero', (req, res) => {
  console.log("update hero", req);
  updateRecord(req, res);
});

function insertRecord(req, res) {
  console.log("Req", req.body);
  var hero = new Hero();
  hero.name = req.body.name;
  hero.save((err, doc) => {
    if (!err) {
      console.log('Hero added successfully');
      res.send(doc);
    } else {
      console.log('Error during record update : ' + err);
      res.send('Error during record insertion please try again after some time.');
    }
  });
}

function updateRecord(req, res) {
  Hero.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error during record update : ' + err);
    }
  });
}

router.get('/api/heroes/:id', (req, res) => {
  Hero.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    }
  });
});

router.delete('/api/heroes/delete/:id', (req, res) => {
  Hero.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else { console.log('Error in employee delete :' + err); }
  });
});

module.exports = router;
