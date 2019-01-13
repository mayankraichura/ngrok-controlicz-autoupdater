module.exports = {
    domoticz: {
        port: 8080      //Your local Domoticz port. Preferably non-HTTPS one.
    },
    controlicz : {
        update: true,
        username: "<controlicz username>",
        password: "<controlicz password>"
    },
    ngrok: {
        authtoken: "<ngrok.com authtoken>"      //Get your authtoken from here. https://dashboard.ngrok.com/auth
    }
};