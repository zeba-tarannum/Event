const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Event = require("./eventModel");
const cors = require("cors");

app.use(cors());

mongoose.connect(
  "mongodb+srv://node-shop:TzVI0kObACEIreHg@cluster0-ziiyb.mongodb.net/EventsManager?retryWrites=true&w=majority",

  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (!err) console.log("Mongoose connection succeeded.");
    else console.log("Error in DB connection", err);
  }
);

app.use(bodyParser.json({ limit: "50000", parameterLimit: 50000 }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "10mb",
//     extended: false
//   })
// );

app.post("/events", (req, res, next) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    idProof: req.body.idProof,
    regType: req.body.regType,
    tickets: req.body.tickets
  });

  event
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Added new event",
        createdEvent: {
          _id: result._id,
          name: result.name,
          mobile: result.mobile,
          email: result.email,
          idProof: result.idProof,
          regType: result.regType,
          tickets: result.tickets
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.get("/events/regType", async (req, res, next) => {
  let count = [];
  const TYPE_LENGTH = 5;

  for (let i = 1; i < TYPE_LENGTH; i++) {
    await Event.find({ regType: i })
      .count()
      .exec()
      .then(data => {
        count.push(data);
        if (i === 4) {
          res.send(count);
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
});

app.get("/events", (req, res, next) => {
  Event.find()
    .exec()
    .then(docs => {
      console.log(docs);
      const response = {
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            mobile: doc.mobile,
            email: doc.email,
            idProof: doc.idProof,
            regType: doc.regType,
            tickets: doc.tickets
          };
        })
      };

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.get("/events/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  Event.findById(id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          msg: "The requested id does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.delete("/delete", (req, res) => {
  Event.remove()
    .exec()
    .then(doc => {
      res.status(200).json({
        msg: "deleted all"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = app;
