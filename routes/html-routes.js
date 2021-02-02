// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/logout", function (req, res) {
    var passport = require("../config/passport");
    passport.logout;
    req.logout();
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  /*
  // Use Handlebars to render the main index.html page with the quotefavorites in it.
  app.get("/favQuotes", function (req, res) {
    db.favQuote.findAll({}).then((favQuotes) => {
      res.render("favQuotes", {favQuotes});
    })
  });
  */
var mysql = require("mysql2");

 var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "quotes"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

 app.get("/favQuotes", function(req, res) {
  connection.query("SELECT * FROM quotefavorites;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }
    console.log("Get",data)
    res.render("favQuotes", { quotefavorites: data });
  });
});

  // Create a new quotefavorite
  app.post("/api/quotefavorites", function (req, res) {
    console.log("User data", req.body.quote)
    connection.query("INSERT INTO quotefavorites (quote) VALUES (?)", [req.body.quote], function (err, result) {
      if (err) {
        return res.status(500).end();
      }

      // Send back the ID of the new quote
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });

  // Delete a quote
  app.delete("/api/quotefavorites/:id", function (req, res) {
    connection.query("DELETE FROM quotefavorites WHERE id = ?", [req.params.id], function (err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      console.log("Delete")
      res.status(200).end();

    });
  });
};
