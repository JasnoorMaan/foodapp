const { Router } = require("express");
const controller = require("../controllers/controller");

const router = Router();

router.get("", controller.getAll);
router.post("/add", controller.postRest);
router.post("/price", controller.pricing);

module.exports = router;
