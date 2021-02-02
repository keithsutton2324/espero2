const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use('/', apiRoutes);

// MySQL Routes
router.use('/', function (req,res) { 
// KJS
/*    
    res.sendFile(path.join(__dirname, "../public/main.html"));
*/    
res.sendFile(path.join(__dirname, "../public/index.html"));
// KJS
});
    
module.exports = router;
