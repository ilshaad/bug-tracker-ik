const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

/*reads our statc files such as css / js / etc… */
app.use("/", express.static(path.resolve(__dirname, "../dist")));

/*Get node server to read from our bundle index.html file */
app.get("*", (req, res) => {
  const pathToIndexHtml = path.resolve(__dirname, "../dist/index.html");
  //   const contentFromHtmlFile = fs.readFileSync(pathToIndexHtml, "utf-8");
  //   res.send(contentFromHtmlFile);

  fs.readFile(pathToIndexHtml, "utf8", (err, data) => {
    if (err) {
      console.error("iK Something went wrong:", err);
      return res.status(500).send("iK server response with 500");
    }

    return res.send(data);
  });
});

/*create a http://localhost:3000 port*/
const portNumber = process.env.PORT || 3000;
app.listen(portNumber, () => {
  console.log(`iK Application is running on http://localhost:${portNumber}`);
});
