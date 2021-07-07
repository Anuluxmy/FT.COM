require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", ".hbs");
app.engine(".hbs", exphbs({ extname: ".hbs" }));

app.get("/", function(req, res) {
  const url = `https://newsapi.org/v1/articles?source=financial-times&sortBy=top&apiKey=${process.env.NEWS_APIKEY}`;
  request(url, function(error, response, body) {
    if (error) {
      res.render("./layouts/main.hbs", {
        articles: null,
        error: "Error,please try again"
      });
    } else {
      const response = JSON.parse(body);
      const article = response.articles;
      res.render("./layouts/main.hbs", { article: article });
    }
  });
});

app.post("/search", function(req, res) {
  const query = req.body.q;
  const options = {
    method: "POST",
    url: "http://api.ft.com/content/search/v1",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": 'a214368bcv2389bjh29389'
    },
    body: JSON.stringify({
      queryString: `${query}`,
      resultContext: {
        maxResults: 25,
        aspects: ["title", "lifecycle", "location", "summary", "editorial"],
        suppressDefaultSort: false
      }
    })
  };
  request(options, function(error, response, body) {
    if (error) {
      res.render("./layouts/main.hbs", {
        search: null,
        error: "Error, please try again"
      });
    } else {
      const responseBody = JSON.parse(body);
      const result = responseBody.results[0];
      const queryTitle = result.results;
      res.render("./layouts/search.hbs", {
        query: query,
        queryTitle: queryTitle
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server is running at port: ", port);
});

app.use(function(req, res) {
  res.status(404).end("Error");
});

module.exports = app;
