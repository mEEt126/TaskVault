const axios = require("axios")
const queryString = require("querystring")
const { setDefaultResultOrder } = require("dns");

setDefaultResultOrder("ipv4first");

const keycloakConfig = {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    realm: process.env.KEYCLOAK_REALM,
    authServerUrl: process.env.KEYCLOAK_AUTH_URL
}


exports.register = async(request, response) => {
    try{
        const {userName, emailId, phoneNo, password} = request.body; 
        
        console.log("we have received request:" + request.body)

        const responseFromKeycloak = await axios.post(
            `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
            {
                userName,
                emailId,
                phoneNo,
                enabled: true,
                Credential: [{type: 'password', value: password, temporary: false}]
            },
            {
                headers:{
                    Authorization: `Bearer ${request.kauth.grant.access_token.token}`,
                    'Content-Type': 'application/json' 
                }
            }
        );
        console.log("successfull")
        response.status(201).json({message: 'User registered Successfully'})
        // POST API TO USER SERVICE TO CREATE NEW RECORD
        // FINALLY create event -  EVENT TYPE as USER_REGISTERD 
    }
    catch(error){
        console.log(error.message)
        response.status(500).json({error: error.message})
    }
}


exports.login = async(request, response) => {
    try{
        const {username, password} = request.body 
        let responseFromKeycloak = await axios.post(
            `${process.env.KEYCLOAK_AUTH_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
            queryString.stringify({
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                grant_type:'password',
                username,
                password,
              }),
            {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }    
            );
        
        if(responseFromKeycloak.status === 200)
        {
            response.status(200).json(responseFromKeycloak.data);
        }                
        else
        {
            response.status(responseFromKeycloak.status).json(responseFromKeycloak.data)
        }
       // response.status(404).json("User not found")
        // pass json token to front end which will get processed by other apis
        // CREATE EVENT - USER_LOGGEDIN
    }
    catch(error){
        //console.error('Error getting token:', error.response ? error.response.data : error.message);
        response.status(500).json({error: error.response ? error.response.data : error.message})
    }
}

exports.logout = async(request, response) => {
    try{
        const { refreshToken } = request.body

        await axios.post(
            `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`,
            queryString.stringify({
                client_id: keycloakConfig.clientId,
                client_secret:keycloakConfig.clientSecret,
                refresh_token: refreshToken
            }), 
            {
                Headers:{
                    'Content_Type' : 'application/x-www-form-urlencoded'
                }
            }
        );
        response.status(204).json({message: "User logged out Successfully"})
            // EVENT - USERLOGGED_OUT
    }
    catch(error)
    {
        response.status(500).json({error: error.message})
    }
}