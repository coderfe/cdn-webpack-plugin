const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use("/static", express.static(path.resolve(__dirname, "static")));

app.post("/cdn", (req, res) => {
  const { filename, content } = req.body;
  const isBuffer = typeof content === 'object';
  fs.writeFile(
    path.resolve(__dirname, `static/${filename}`),
    isBuffer ? Buffer.from(content.data) : content,
    { encoding: isBuffer ? 'binary' : 'utf-8' },
    err => {
    if (err) {
      res.json(err);
    }
    res.send(`http://localhost:3000/static/${filename}`);
  });
});

app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});
