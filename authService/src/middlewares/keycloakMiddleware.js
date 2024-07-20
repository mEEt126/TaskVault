const  { keycloak }  = require(".././config/keycloak.js")

if(!keycloak)
    console.log("Keycloak Instance is not defined")
else
    console.log("Keycloak instance found")

const protect = keycloak.protect()

module.exports = protect