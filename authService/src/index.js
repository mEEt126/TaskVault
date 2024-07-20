const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const {keycloak, memoryStore } = require("./config/keycloak.js")
const authRoutes = require("./routes/authRoutes.js")

require('dotenv').config()

const authApp = express()

authApp.use(bodyParser.json())
authApp.use(session({
    secret: "My TaskVaultApp",
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}))

authApp.use(keycloak.middleware())

authApp.use("/auth", authRoutes)
authApp.use(express.json());

const port = process.env.PORT || 3000 

authApp.listen(port, ()=> {
    console.log(`Auth Service started on port ${port}`)
})