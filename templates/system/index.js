const express = require("express");
const router = express.Router();

// Create your routes here

router.route("/").get(require("./modules/get"));

router.route("/").post(require("./modules/post"));

module.exports = router;