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

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    else {
      //res.sendFile(path.join(__dirname, "../public/signup.html"));
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
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

  // Favorite Quotes routes
  app.get("/favQuotes", function (req, res) {
    db.favQuote.findAll({ raw: true }).then((data) => {

      var hbsdata = {}
      hbsdata.dataList = data
      //console.log("KJS----- Test get route >findAll, User data:", hbsdata);
      //res.render("favQuotes", { quotefavorites: data });
      res.render("favQuotes", hbsdata);
    })
  });

  // Create a new quotefavorite
  app.post("/api/quotefavorites", function (req, res) {
    //console.log("KJS----->create, User data:", req.body.quote)
    db.favQuote.create({ user: req.params.user, quote: req.body.quote });
    res.redirect("/favQuotes");
  });

  // Delete a quote
  app.delete("/api/quotefavorites/:id", function (req, res) {
    db.favQuote.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (dbPost) {
      res.json(dbPost);
    });
  });

};
