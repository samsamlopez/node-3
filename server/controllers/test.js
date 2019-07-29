const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

function create(req, res) {
 const db = req.app.get("db");
 const { email, password } = req.body;
 argon2
   .hash(password)
   .then(hash => {
     return db.users.insert(
       {
         email,
         password: hash,
         user_profiles: [
           {
             userId: undefined,
             about: null,
             thumbnail: null
           }
         ]
       },
       {
         fields: ["id", "email"],
         deepInsert: true,
       }
     );
   })
   .then(user => {
     const token = jwt.sign({ userId: user.id }, secret);
     res.status(201).json({ ...user, token });
   })
   .catch(err => {
     console.error(err);
     res.status(500).end();
   });
}
function list(req, res) {
 const db = req.app.get("db");
 db.users
   .find()
   .then(users => {
     const token = jwt.sign({ userId: users.id }, secret);
     delete users.password;
     res.status(200).json({...users,token})
   })
   .catch(err => {
     console.error(err);
     res.status(500).end();
   });
}
function getById(req, res) {
 const db = req.app.get("db");
 const id = req.params.id
 db.users
   .findOne(
     {
     id
   },
   {
     fields:["id","email"]
   }
   )
   .then(user => {
     const token = jwt.sign({ userId: user.id }, secret);
     delete user.password;
     res.status(200).json({...user,token})
   })
   .catch(err => {
     console.error(err);
     res.status(500).end();
   });
}
function getProfile(req, res) {
 const db = req.app.get("db");
 db.user_profiles
   .findOne(
     {
     userId: req.params.id
   },
   )
   .then(user => {
     const token = jwt.sign({ userId: user.id }, secret);
     delete user.password;
     res.status(200).json({...user,token})
   })
   .catch(err => {
     console.error(err);
     res.status(500).end();
   });
}
module.exports = {
 create,
 list,
 getById,
 getProfile
};