const { Router } = require("express");
const controller = require("../controller/controller");

const router = Router();
router.get("/api", controller.getAll);

module.exports = router;
