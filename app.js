// import express from "express";
// import { v4 as uuidv4 } from "uuid";
// import bcrypt from 'bcryptjs';

// const users = [
//   {
//     id: "1",
//     email: "google@gmail.com",
//     password: "123456",
//   },
//   {
//     id: "2",
//     email: "avi@gmail.com",
//     password: "456789",
//   },

//   {
//     id: "3",
//     email: "wdsd@gmail.com",
//     password: "44545",
//   },
// ];


// const app = express();
// app.use(express.json());

// const port = 3000;

// app.get("/users", (req, res) => {
//   res.status(200).json(users);
// });

// app.get("/user", (req, res) => {
//   const id = req.body.id;
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].id === id) {
//       res.status(200).json(users[i]);
//     }
//   }
// });

// app.post("/users", (req, res) => {
//   const { email, password} = req.body;

//   const hash = bcrypt.hashSync(password, 10);

//   const user = {
//     id: uuidv4(),
//     email,
//     password : hash
//   };
//   users.push(user);
//   res.status(201);
//   res.send(users);
// });

// app.put("/users", (req, res) => {
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].id === req.body.id) {
//       users[i].email = req.body.email;
//       users[i].password = req.body.password;
//       res.status(201);
//       res.send("user update ");
//     }
//   }
//   res.status(400);
//   res.send("id is not found");
// });

// app.delete("/users", (req, res) => {
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].id == req.body.id) {
//       users.splice(i, 1);
//       console.log(users);
//       res.status(201);
//       res.send(res.json(users));
//     }
//   }
//   res.status(400);
//   res.send("user is not found");
// });

// app.post("/login", (req, res) => {
//   for (let i = 0; i < users.length; i++) {
//     if (
//       users[i].email === req.body.email &&
//       users[i].password === req.body.password
//     ) {
//       res.status(200);
//       res.send("User is connected ");
//     }
//   }
//   res.status(400);
//   res.send("wrong credentials");
// });

// app.listen(port, () => {
//   console.log(`Server is up and running on port:${port}`);
// });

import express, { json } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcryptjs';

const users = [
  {
    id: "1",
    email: "google@gmail.com",
    password: "$2a$10$vL65zATZ5joXiiTLBdGtxejFVJjIHC4w76u5kWFwMgRvVKSZhJ/S2",
  },
];

const app = express();
app.use(express.json());

const port = 3000;

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/users", (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  console.log(hash)
  const user = {
    id: uuidv4(),
    email,
    password: hash,
  };
  users.push(user);
  res.status(201).json(users);
});

app.put("/users", (req, res) => {
  const { id, email, password } = req.body;
  const userToUpdate = users.find(user => user.id === id);
  if (userToUpdate) {
    userToUpdate.email = email;
    userToUpdate.password = password;
    res.status(201).send("User updated"+JSON.stringify(users));
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users", (req, res) => {
  const { id } = req.body;
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(201).json(users);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  // Password is not hashed, but user.password is hashed
  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).send("User is connected");
  } else {
    res.status(400).send("Wrong credentials");
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
