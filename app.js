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

// if (process.env.NODE_ENV === "production") {
//   //set static folder
//   app.use(express.static("client/build"));
// }
// // app.get("*", (req, res) => {
// //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// // });

app.use(bodyParser.json({ limit: "10mb", extended: true }));

app.post("/events", (req, res, next) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    idProof: req.body.idProof,
    regType: req.body.regType,
    tickets: req.body.tickets,
    // date: new Date().toJSON().substring(0, 10)
    date: new Date()
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
          tickets: result.tickets,
          date: result.date
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.get("/events/regType", (req, res, next) => {
  Event.aggregate([
    {
      $group: {
        _id: "$regType",
        count: { $sum: 1 }
      }
    }
  ])
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  // let count = [];

  // const TYPE_LENGTH = 5;
  // const types = ["Self", "Group", "Corporate", "Others"];
  // for (let i = 0; i < types.length; i++) {
  //   await Event.find({ regType: types[i] })
  //     .count()
  //     .exec()
  //     .then(data => {
  //       let value = {};
  //       value["Type"] = types[i];
  //       value["Count"] = data;
  //       // console.log(value);
  //       //  count[0] = value;
  //       // value = `Type:${types[i - 1]},value:${data}`;
  //       count.push(value);
  //       // console.log(value);
  //       console.log(count);
  //       //   console.log("my array", count);
  //       if (i === 3) {
  //         res.send(count);
  //       }
  //     })
  //     .catch(err => {
  //       res.status(500).json({ error: err });
  //     });
  // }
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
            tickets: doc.tickets,
            date: doc.date
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

app.get("/date", (req, res) => {
  Event.aggregate([
    // {
    //   $group: {
    //     _id: "$date",
    //     count: { $sum: 1 }
    //   }
    // }
    {
      $group: {
        _id: { $dateToString: { format: "%m/%d", date: "$date" } },
        count: { $sum: 1 }
      }
    }
  ])
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
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
