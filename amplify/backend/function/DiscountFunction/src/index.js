const serverless = require("serverless-http");
const app = require("./discount/discount-server");
app.use((req, res, next) => {
  console.log(`Received request for URL: ${req.url}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

exports.handler = serverless(app);
