const { Router: er } = require("express");
const router = er();

// Create your routes here

router.get("/", require("./modules/get"));

router.post("/", require("./modules/post"));

module.exports = router;