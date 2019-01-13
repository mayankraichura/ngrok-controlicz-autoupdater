const NGROK_RETRY_INTERVAL = 30000,
      CTRLZ_RETRY_INTERVAL = 30000;
const controlicz_update_url = "https://controlicz.com/hostname";
const config = require("./config"),
    ngrok = require("ngrok"),
    request = require("request");



var n_tmr, u_tmr;


ngrok.on("connect", function (url) {
    console.log("[N-CON]", url);
    u_tmr = setTimeout(function () {
        doUpdate(url);
    }, 100);
});

ngrok.on("disconnect", function (data) {
    console.log("[N-DCN]", data);
    n_tmr = setTimeout(function(){
        doNgrok();
    }, NGROK_RETRY_INTERVAL);
});

ngrok.on("error", function (data) {
    console.log("[N-ERR]", data);
    console.log("[N-ERR] Let's try again in 30s");
    ngrok.disconnect();
});


var doUpdate = function (url) {
    if(u_tmr) clearTimeout(u_tmr);

    url = url.replace("https://", "");
    if (config.controlicz.update) {
        console.log('[U-DBG] Updating Controlicz to ' + url);

        var auth = 'Basic ' + new Buffer(config.controlicz.username + ":" + config.controlicz.password).toString("base64");
        var options = {
            method: 'POST',
            url: controlicz_update_url,
            headers: {
                'cache-control': 'no-cache',
                Authorization: auth,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                host: url,
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                console.log("[U-ERR]", error);
                console.log("[U-ERR] Retrying update in 30s");
                u_tmr = setTimeout(function(){
                    doUpdate(url);
                }, CTRLZ_RETRY_INTERVAL);
            }else{
                if(body === "hostname changed"){
                    console.log("[U-INF] Update Successful");
                }else{
                    console.log("[U-ERR]", body);
                    console.log("[U-ERR] Invalid response. Will try in 30s");
                    u_tmr = setTimeout(function(){
                        doUpdate(url);
                    }, CTRLZ_RETRY_INTERVAL);
                }
            }
        });

    } else {
        console.log('[U-ERR] Controlicz update is disabled. No further action will be taken.');
    }
};

var doNgrok = function () {
    if (n_tmr) {
        clearTimeout(n_tmr);
    }

    if (config.ngrok.authtoken) {
        console.log('[N-DBG] Connecting...');
        ngrok.connect({
            authtoken: config.ngrok.authtoken,
            port: config.domoticz.port,
            proto: 'http'
        });
    } else {
        console.error('[N-CONFIG] No ngrok authtoken found!');
    }
};

doNgrok();