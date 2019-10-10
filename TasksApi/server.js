var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var tasks = require("./routes/tasks");
var files = require("./routes/files");
var cors = require("cors");
var port = 3000;
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", tasks);
app.use("/api", files);

app.listen(port, function() {
    console.log("El servidor está inicializado en el puerto " + port);
});