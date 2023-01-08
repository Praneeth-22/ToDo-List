const express = require("express"); //to handle api
const mongoose = require("mongoose"); // to handle database
const cors = require("cors");

const app = express(); //to use express

app.use(express.json()); //content type of json application
app.use(cors()); //protect from any cross origin errors

//-----------------connection----------------
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1/mern-todo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to DB"))
  .catch(console.log.error);
//-----------------------------------------

const Todo = require("./models/Todo"); //importing

//if we make a request to "localhost/3001/todos" it find all todos from mongo data base and return to todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.get("/todo/new", (req, res) => {
  //creates a new collection in the database
  const todo = new Todo({
    text: req.body.text,
  });
});
app.listen(3001, () => console.log("Server started on port 3001"));
