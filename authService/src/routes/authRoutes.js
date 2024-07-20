const express = require("express")
const router = express.Router()
const authController = require(".././controllers/authController.js")
const protect = require(".././middlewares/keycloakMiddleware.js")


router.post("/register", protect, authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

module.exports = router