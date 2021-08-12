import express from "express";
import mysql from "mysql";

const app = express();

app.use(express.json());

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "firstdatabase",
});

//connect database

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Database Connected");
});

//create db
app.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE newDatabase";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("New Database Created");
  });
});

//create table
app.get("/createtable", (req, res) => {
  db.query(
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send("Post Table Created");
    }
  );
});

//insert first post
app.get("/firstpost", (req, res) => {
  let post = { title: "POST 1", body: "This is post one" };
  db.query("INSERT INTO posts SET ?", post, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("First Post Added");
  });
});

//insert second post
app.get("/secondpost", (req, res) => {
  let post = { title: "2nd POST", body: "TEST AND LEARN" };
  db.query("INSERT INTO posts SET ?", post, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Second Post Added");
  });
});

//select all data
app.get("/selectall", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.json(result);
  });
});

//select particular data
app.get("/select/:id", (req, res) => {
  db.query(`SELECT * FROM posts WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Post fetched");
  });
});

//update post
app.get("/update/:id/:newTitle", (req, res) => {
  db.query(
    `UPDATE posts SET title= '${req.params.newTitle}' WHERE id=${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send("POST UPDATED");
    }
  );
});

//delete post
app.get("/deletepost/:id", (req, res) => {
  db.query(`DELETE FROM posts WHERE id=${req.params.id}`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("POST DELETED");
  });
});

app.listen(3000, () => {
  console.log("Server Started on 3000");
});
