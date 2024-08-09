const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const createConnection = (pwd) => {
  const url = `mongodb+srv://milan:${pwd}@cluster0.x0se8.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set("strictQuery", false);

  mongoose.connect(url);
};

if (process.argv.length < 3) {
  console.log(
    'Some argument is missing! correct use of mongo: \nAdd: "node mongo.js [yourpassword] [name] [phoneNo]" \nFetch datas: "node mongo.js [yourpassword]"'
  );
  process.exit(1);
} else if (process.argv.length == 3) {
  createConnection(process.argv[2]);
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number} \n`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length == 5) {
  const name = process.argv[3];
  const tel = process.argv[4];

  createConnection(process.argv[2]);

  const person = new Person({
    name: name,
    number: tel,
  });
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
