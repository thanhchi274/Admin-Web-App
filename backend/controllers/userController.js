const admin = require("firebase-admin");
const asyncHandler = require("express-async-handler");
const FireStore = admin.auth()
const getUsers = asyncHandler(async (req, res) => {
const {id, email,phoneNumber}=req.query
  if (email) {
    FireStore
      .getUserByEmail(email)
      .then(userRecord => {
        res.status(200).send(JSON.stringify(userRecord));
      })
      .catch(error=> {
        res.status(404).json({ message: "User not found" });
      });
  }
  else if (id) {
    FireStore
      .getUser(id)
      .then((userRecord) => {
        res.status(200).send(JSON.stringify(userRecord));
      })
      .catch((error) => {
        res.status(404).json({ message: "User not found" });
      });
  }
  else if(phoneNumber){
    FireStore
    .getUserByPhoneNumber(phoneNumber)
    .then(userRecord => {
      res.status(200).send(JSON.stringify(userRecord));
    })
    .catch(error => {
        res.status(500).json({ message: "Error fetching user data", error: error});
    });
  }
  else{
    var allUsers = [];
    return FireStore
      .listUsers()
      .then(function (listUsersResult) {
        listUsersResult.users.forEach(function (userRecord) {
          let userData = userRecord.toJSON();
          allUsers.push(userData);
        });
        res.status(200).send(JSON.stringify(allUsers));
      })
      .catch(function (error) {
        res.status(500).json({ message: "Error fetching user data", error: error});
      });
  }
});
const deleteUser = asyncHandler(async (req, res) => {
    const idLength= Object.keys(req.query).length
    const id =req.query.id
    if(idLength===1){
        FireStore
        .deleteUser(id)
        .then(() => {
            res.status(200).send({ message: "User deleted"});
        })
        .catch((error) => {
            res.status(404).send({ message: "Error Delete", error: error});
        });
    }
    else if(idLength>1 && idLength<20){
        FireStore
        .deleteUsers(id)
        .then((deleteUsersResult) => {
            res.status(200).send({ successCount: deleteUsersResult.successCount,
            failureCount: deleteUsersResult.failureCount});
            deleteUsersResult.errors.forEach((err) => {
                res.status(404).send({ message: "Error Delete", error: err.error});
            });
        })
        .catch((error) => {
            console.log('Error deleting users:', error);
        });
    }
    else{
        res.status(401).send({ message: "Error Syntax Delete"});
    }
});
const updateUser = asyncHandler(async (req, res) => {
    const id  =req.query.id
    const {email,phoneNumber,emailVerified,password,displayName,photoURL,disabled} = req.body
    FireStore.updateUser(id, {
    email,
    phoneNumber,
    emailVerified,
    password,
    displayName,
    photoURL,
    disabled,
  })
  .then((userRecord) => {
    res.status(200).send({message:"Update Successfully", userRecord: userRecord});
  })
  .catch((error) => {
    res.status(401).send({ error: error.message});
  });
})
const createUser  = asyncHandler(async (req, res) => {
  const {email, phoneNumber, emailVerified,password, displayName, photoURL, disabled} = req.query
  admin
  .auth()
  .createUser({
    email,
    emailVerified,
    phoneNumber,
    password,
    displayName,
    photoURL,
    disabled,
  })
  .then((userRecord) => {
    res.status(200).send({message:"Successfully created new user",id: userRecord.uid});
  })
  .catch((error) => {
    res.status(401).send({ error: error.message});
  });
})
module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
};
