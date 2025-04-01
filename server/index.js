const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = []; // { id: 1, description: "do homework"}

const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.get('/todos', (req, res) => {
    res.json(todos);
  }
);

app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = {id: todos.length + 1, description: task};
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const todo = todos.find(task => task.id === parseInt(id));

  if (todo) {
    todo.description = task;
    res.json(todo);
  } else {
    res.json({ error: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== Number(id));
  res.status(200).json({ message: 'Todo deleted' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });



