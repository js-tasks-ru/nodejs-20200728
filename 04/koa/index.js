const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');

const app = new Koa();
app.use(static('public'));
/**
 * 
 * function promise() {
 *   return new Promise(resolve => {
 *     setTimeout(resolve, 1000);
 *   });
 * }
 * 
 * promise()
 *  .then(() => {
 *    return promise(); // 1s
 *  })
 *  .then(() => {
 *    promise(); // 2s
 *  })
 *  .then(() => {
 *    return promise(); // 2s
 *  });
 * 
 * async function() {
 *    await promise1();
 *    promise2();
 *    await promise3();
 *    await promise4();
 * }
 */

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = 'internal server error';
  }
});

app.use(async (ctx, next) => {
  const now = Date.now();
  await next();
  console.log('new request', ctx.method, ctx.url, `${Date.now() - now}ms`);
});

// app.use(async (ctx, next) => {
//   const body = [];

//   for await (const chunk of ctx.req) {
//     body.push(chunk);
//   }

//   ctx.myBody = JSON.parse(Buffer.concat(body).toString());
//   return next();
// });
app.use(bodyparser()); // ctx.request.body

const router = new Router();

router.post('/', (ctx, next) => {
  const {message} = ctx.request.body;
  console.log(message);
  if (!message) {
    ctx.throw(400, 'message is required');
  } else {
    ctx.body = message;
  }

  return next();
});

router.get('/books/:id', (ctx, next) => {
  console.log(ctx.params.id);
});

router.get('/subscribe', async (ctx, next) => {
  // ...
});

app.use(router.routes());

app.listen(3000);
