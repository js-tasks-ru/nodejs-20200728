let i = 0;

function handler(req, res) {
  console.log('request');
  i++;
  res.end(i.toString());
}

export default handler;
