const { faker } = require('@faker-js/faker');
const SignupModel = require('../models/signup');

const randomChoice = (choices) =>
  choices[Math.floor(Math.random() * choices.length)];

const generateUser = () => ({
  email: faker.internet.email(),
  password: 'testUser123',
  displayName: faker.person.firstName(),
  surname: faker.person.lastName(),
  nationality: 'Tibet', // Fixed value
  gender: randomChoice(['Male', 'Female', 'Other']),
  dateOfIssue: faker.date.past({ years: 10 }).toISOString().split('T')[0],
  dateOfExpiry: faker.date.future({ years: 10 }).toISOString().split('T')[0],
  nameOfFather: faker.person.fullName(),
  nameOfMother: faker.person.fullName(),
  nameOfSpouse: Math.random() < 0.5 ? faker.person.fullName() : 'N/A', // 50% chance of having a spouse
  address: faker.location.streetAddress(),
  fileNumber: crypto.randomUUID(),
  phone: faker.phone.number(),
  dateOfBirth: faker.date.birthdate(),
});

for (let i = 0; i < 10; i++) {
  try {
    SignupModel.registerUser(generateUser());
  } catch (error) {
    console.log('Skipping user creation');
  }
}
