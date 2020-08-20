const users = [
  {name: 'Andrey'},
  {name: 'Dmitry'},
  {name: 'Ivan'},
  {name: 'Anna'},
  {name: 'Victoria'},
];

const usersByName = {
  Andrey: users[0],
  Dmitry: users[1],
  Ivan: users[2],
  Anna: users[3],
  Victoria: users[4],
};

function findByName(name) {
  // return users.filter(user => user.name === name);
  return usersByName[name] || [];
}

function createUser(name) {
  if (usersByName[name]) throw new Error('already exists');
  users.push({name});
  usersByName[name] = users[users.length - 1];
  return usersByName[name];
}

console.log(createUser('John'));
console.log(createUser('John'));




const arr = [1,2,3,4,5,6,7];

arr.indexOf(9);
arr[7];