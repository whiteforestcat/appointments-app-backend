const express = require("express");
const controllers = require("../controller/controller");
const router = express.Router();
const auth = require("../middleware/auth")

router.get("/allusers", controllers.getinfo)
router.get("/seed", controllers.seed)
router.put("/create", controllers.createInfo)
router.post("/search", controllers.searchInfo)
router.patch("/update", controllers.updateInfo)
router.delete("/delete", controllers.deleteInfo)
router.post("/searchbydate", controllers.searchByDate)


module.exports = router;
