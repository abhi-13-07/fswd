const express = require("express");
const app = express();
const port = 3000;
const { engine } = require("express-handlebars");

app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "planB",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.use(express.static("public"));

fakeApi = () => {
  return [
    {
      name: "Katarina",
      lane: "midlaner",
    },
    {
      name: "Jayce",
      lane: "toplaner",
    },
    {
      name: "Heimerdinger",
      lane: "toplaner",
    },
    {
      name: "Zed",
      lane: "midlaner",
    },
    {
      name: "Azir",
      lane: "midlaner",
    },
  ];
};

app.get("/", (req, res) => {
  res.render("main", {
    layout: "index",
    suggestedChamps: fakeApi(),
    listExists: true,
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));

const display = (msg) => console.log(msg);
