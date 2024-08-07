const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));

app.use((req, res, next) => {
  if (req.method !== "POST") {
    morgan("tiny")(req, res, next);
  } else {
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :body"
    )(req, res, next);
  }
});

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const n = persons.length;
  res.send(`
    <p>Phonebook has info for ${n} people </p>
     <p>${new Date().toDateString()} ${new Date().toTimeString()} </p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  let id;
  do {
    id = Math.trunc(Math.random() * 1000);
  } while (persons.find((person) => person.id === id));
  return String(id);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  if (persons.find((p) => person.name === p.name)) {
    return res.status(409).json({ error: "name must be unique" });
  }

  persons = persons.concat(person);
  res.json(person);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
