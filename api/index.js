//Various libraries are imported
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const List = require("./models/List.js");
const Task = require("./models/Task.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

//Email for 2FA will be sent using gmail services
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cmt2fa@gmail.com",
    pass: process.env.PASS,
  },
});

//This for password hashing and is generated.
const bcryptSalt = bcrypt.genSaltSync(10);

//jwtS loaded in from environemtal variable
const jwtS = process.env.JWTSECRET;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//Register endpoint to add new user to system
app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, number, password, TFA } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      number,
      password: bcrypt.hashSync(password, bcryptSalt),
      TFA,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

//2FA login endpoint to log 2fa user into system. 
app.post("/api/2falogin", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    const { email, password, userEnteredNumber } = req.body;

    const userDoc = await User.findOne({ email });

    if (userDoc) {
      if (userEnteredNumber != null) {
        const CheckPassword = bcrypt.compareSync(password, userDoc.password);
        if (CheckPassword) {
          jwt.sign(
            { email: userDoc.email, id: userDoc._id },
            jwtS,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json(userDoc);
            }
          );
        }
      }
    }
  });
});

//Login endpoint to log user into system
app.post("/api/login", async (req, res) => {
  
  
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    const { email, password } = req.body;
    const lowercasedEmail = email.toLowerCase();
    const randomlyGeneratedNumber = Math.floor(Math.random() * 100000);
    const userDoc = await User.findOne({ email: lowercasedEmail });
  
    if (userDoc) {
      if (userDoc.TFA == "Disabled") {
        const CheckPassword = bcrypt.compareSync(password, userDoc.password);
        if (CheckPassword) {
          jwt.sign(
            { email: userDoc.email, id: userDoc._id },
            jwtS,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json(userDoc);
            }
          );
        }
      } else {
        if (userDoc.TFA == "Enabled") {
          const randomlyGeneratedNumber = Math.floor(Math.random() * 100000);
          const mailOptions = {
            from: "cmt2fa@gmail.com",
            to: "shivenchhugani@gmail.com",
            subject: "Test Email",
            text: "This is a test email" + randomlyGeneratedNumber + "sent from Nodemailer.",
          }
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error occurred:", error);
            } else {
              console.log("Email sent successfully:", info.response);
            }
          });
          
            await new Promise(resolve => setTimeout(resolve, 1000));
          
            res.json({
            action: "generateTFA",
            value: randomlyGeneratedNumber,
            user: userDoc,
            });
            
        }
      }
    }
  })
             
})

//Profile endpoint to get  user information
app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtS, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, TFA } = await User.findById(userData.id);
      res.json({ name, email, _id, TFA });
    });
  } else {
    res.json(null);
  }
});

//Logout endpoint to log user out 
app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

//Get List endpoint to get lists 
app.get("/api/lists", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    const { email } = userData;
    res.json(await List.find({ owner: email }));
  });
});

//Get Task endpoint to get tasks of lists
app.get("/api/lists/:listId/tasks", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    Task.find({
      _listId: req.params.listId,
    }).then((tasks) => {
      res.send(tasks);
    });
  });
});

//Get Task endpoint to get tasks of lists
app.get("/api/listss/:_id/tasks", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    List.find({
      _id: req.params._id,
    }).then((tasks) => {
      res.send(tasks);
    });
  });
});

//Create List endpoint to get create list
app.post("/api/lists", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { title } = req.body;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    if (err) throw err;
    const ListDoc = await List.create({
      email: userData.id,
      owner: userData.email,
      title,
    });
    res.json(ListDoc);
  });
});

//Create List endpoint to get create list
app.post("/api/newtask/:listId", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    if (err) throw err;
    const newTaskDoc = await Task.create({
      title: req.body.title,
      _listId: req.params.listId,
    });
    res.send(newTaskDoc);
  });
});

//Update List endpoint to get update list
app.patch("/api/updatelists/:ID", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    List.findOneAndUpdate(
      { _id: req.params.ID },
      {
        $set: req.body,
      }
    ).then(() => {
      res.sendStatus(200);
    });
  });
});
//Update task endpoint to get update task
app.patch("/api/enablecollaborator/:ID", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    User.findOneAndUpdate(
      { _id: req.params.ID },
      {
        $set: { TFA: "Enabled" },
      }
    ).then(() => {
      res.sendStatus(200);
    });
  });
});

//Update Collaborator endpoint to get update Collaborator
app.patch("/api/disablecollaborator/:ID", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    User.findOneAndUpdate(
      { _id: req.params.ID },
      {
        $set: { TFA: "Disabled" },
      }
    ).then(() => {
      res.sendStatus(200);
    });
  });
});

//Delete Collaborator endpoint to get delete Collaborator
app.delete("/api/deletelists/:ID", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    List.findOneAndDelete({
      _id: req.params.ID,
    }).then((removedlistDoc) => {
      res.send(removedlistDoc);
    });
  });
});

//Delete task endpoint to get delete task
app.delete("/api/deletetask/:taskID", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    Task.findOneAndDelete({
      _id: req.params.taskID,
    }).then((removedtaskDoc) => {
      res.send(removedtaskDoc);
    });
  });
});

//Update task endpoint to get update task
app.patch("/api/updatetask/:taskID", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    Task.findOneAndUpdate(
      {
        _id: req.params.taskID,
      },
      {
        $set: req.body,
      }
    ).then(() => {
      res.sendStatus(200);
    });
  });
});

//Get collaborator endpoint to get Get all collaborators
app.get("/api/collaborations/:ID", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    const { email } = userData;
    res.json(await List.find({ owner: email }));
  });
});

//Get List endpoint to get Get all lists
app.get("/api/lists", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    const { email } = userData;
    res.json(await List.find({ owner: email }));
  });
});

//Update collaborator endpoint to get update collaborators
app.put("/api/newcollab/:ID", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    const { owner } = req.body;
    const { ID } = req.params;
    try {
      const currentList = await List.findOneAndUpdate(
        { _id: ID },
        { $push: { owner } },
        { new: true }
      );

      if (currentList) {
        res.json({
          success: true,
          message: "Updated successfully",
          updatedList: currentList,
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
});

//Delete collaborator endpoint to get delete a collaborator
app.delete("/api/removecollab/:ID", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtS, {}, async (err, userData) => {
    const { owner } = req.body;
    const { ID } = req.params;

    try {
      const updatedList = await List.findOneAndUpdate(
        { _id: ID },
        { $pull: { owner: owner } },
        { new: true }
      );

      res.json({ success: true, updatedList });
    } catch (e) {
      console.error(e);
    }
  });
});

//Activates Express.js sever so it can process incoming HTTP requests on port 4000
app.listen(4000);


