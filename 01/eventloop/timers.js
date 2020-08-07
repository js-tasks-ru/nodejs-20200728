queueMicrotask(() => {
  console.log('queueMicrotask1');

  queueMicrotask(() => {
    console.log('queueMicrotask2');
  });

  process.nextTick(() => {
    console.log('process.nextTick2');
  });
});

process.nextTick(() => {
  console.log('process.nextTick1');
});