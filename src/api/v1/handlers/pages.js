const path = require("path");

function selectHTMLPage(fileName) {
  return function (req, res) {
    const filePath = path.resolve("src", "pages", `${fileName}.html`);
    res.status(200).sendFile(filePath);
  };
}

module.exports = { selectHTMLPage };
