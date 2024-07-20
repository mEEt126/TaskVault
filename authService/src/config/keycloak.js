const session = require("express-session")
const Keycloak = require("keycloak-connect")

const memoryStore = new session.MemoryStore()

let keycloak

if(!keycloak)
{
    keycloak = new Keycloak({store: memoryStore})  
    //console.log("Keycloak Instance created: "+ keycloak)
}


module.exports = { keycloak,memoryStore }