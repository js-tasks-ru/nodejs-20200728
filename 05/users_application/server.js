const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');
const mongoose = require('mongoose');

const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    ctx.status = 500;
    ctx.body = 'Internal server error';
    console.error(err);
  }
});

const router = new Router();

function mapUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  }
}

function validateObjectId(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.status = 400;
    ctx.body = {message: 'invalid id'};
    return;
  }
  return next();
}

router.get('/users', async (ctx) => {
  const users = await User.find();
  ctx.body = {users: users.map(mapUser)};
});

router.get('/users/:id', validateObjectId, async (ctx) => {
  // .find(), .findOne(), findById()
  // mongoose.Types.ObjectId.isValid()
  const user = await User.findById(ctx.params.id);
  if (!user) {
    ctx.status = 404;
    ctx.body = {};
  } else {
    ctx.body = {user: mapUser(user)};
  }
});

router.delete('/users/:id', validateObjectId, async (ctx) => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  if (!user) {
    ctx.status = 404;
    ctx.body = {};
  } else {
    ctx.body = {user: mapUser(user)};
  }
});

router.patch('/users/:id', validateObjectId, async (ctx) => {
});

router.post('/users', async (ctx) => {
});

app.use(router.routes());

module.exports = app;
