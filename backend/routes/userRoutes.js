const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/users", controller.getUsers);
router.get("/score/:id", controller.getScore);
router.get("/filter", controller.filterUsers);

module.exports = router;