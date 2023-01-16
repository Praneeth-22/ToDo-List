const express = require("express"); //to handle api
const mongoose = require("mongoose"); // to handle database
const cors = require("cors");

const app = express(); //to establish server

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
app.get('/todos', async (req, res) => {  //first paramter is the path(route),2nd function
  const todos = await Todo.find();
  res.json(todos);
});// GET() send data to be displayed when specific url is opened

app.post('/todo/new', (req, res) => {
  //creates a new collection in the database
  const todo = new Todo({
    text: req.body.text, 
  });
  todo.save()
  res.json(todo)
});

app.delete('/todo/delete/:id',async(req,res)=>{
  const result = await Todo.findByIdAndDelete(req.params.id)
  res.json({result})
})

app.get('/todo/complete/:id',async(req,res)=>{
  const todo = await Todo.findById(req.params.id)
  todo.complete = !todo.complete
  todo.save()
  res.json(todo)
})

app.put('/todo/update/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;

  todo.save();

  res.json(todo);
});



app.listen(3001, () => console.log("Server started on port 3001")); //app listening at server port 3001
