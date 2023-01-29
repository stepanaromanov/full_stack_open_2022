const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please, provide the password as an argument.');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://huugdd7yh:${password}@cluster0.21szclx.mongodb.net/personsApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

mongoose.set('strictQuery', false);
mongoose.connect(url);

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('phonebook: ');
    persons.forEach((person) => console.log(`${person.name}, ${person.number}`));
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  });
}
