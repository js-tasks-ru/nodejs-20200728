function sayHello(age, cb) {
  if (age <= 0) {
    return process.nextTick(() => cb(new Error('age can not be less than 0')));
  }
  setTimeout(() => {
    cb(null, `hello, you are ${age} years old`);
  }, 100);
}

sayHello(-10, (err, msg) => {
  if (err) {
    console.error(err);
  } else {
    console.log(msg);
  }
});

console.log('hello');
