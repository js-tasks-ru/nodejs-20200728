const mongoose = require('mongoose');

mongoose.set('debug', true);

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  type: {
    type: String,
    enum: ['poster', 'avatar']
  }
});

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 'такой email уже есть',
    validate: [{
      validator: value => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: 'email некорректный'
    }]
  },
  name: {
    type: String,
  },
  images: [imageSchema]
});

const User = mongoose.model('User', schema); // users

async function main() {
  await mongoose.connect('mongodb://localhost/test');
  
  await User.deleteMany();
  
  const user = await User.create({
    email: 'user@mail.com',
    name: 'user',
  });
  
  // console.log(user);
  
  const users = await User.find({email: 'asdasd@asd.asd'}).sort({name: 1});
  
  console.log(users);
  
  mongoose.disconnect();
}

main();
