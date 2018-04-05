const jsonBody = require("body/json");
var scores = [{
  name: "Edwin",
  score: 50
}, {
  name: "David",
  score: 39
}];

var resources = {
  "/IP": "Internet Protocol",
  "/TCP": "Transmission Control Protocol",
  "/scores": scores
};

const textBody = require("body");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  var body;
  if (req.method === "GET") {
    if (resources[req.url] === undefined) {
      res.statusCode = 404;
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/javascript');
      scores.sort((a,b) => (b.score -a.score));
      scores = scores.splice(0,3);
      body = JSON.stringify(scores);
    }
  } else if (req.method === "PUT") {
    res.statusCode = 201;
    textBody(req, res, (err, body) => {
      resources[req.url] = body;
    })
  } else if (req.method === "POST") {
    res.statusCode = 201;
    jsonBody(req, res, (err, body) => {
      scores.push(body);
    })
  }
  res.end(JSON.stringify(scores));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

