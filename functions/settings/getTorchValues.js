//AMPLink Server Controllers
//Made by sam

const request = require('request');
const { json } = require('stream/consumers');
require('dotenv').config();

exports.getTorchValues = async function (string, array) {

  const bearerToken = `${process.env.TORCHREMOTE_TOKEN}`
  const options = {
    url: `${process.env.TORCHREMOTE_ADDRESS}/api/v1/settings/${string}/values`,
    body: array,
    headers: {
      'Authorization': `Bearer ${bearerToken}`
    }
  };
  return new Promise((resolve) => {
  request.get(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }

    if (response.statusCode == 401) {
      console.log("[E008] Error accessing remote data.")
    } else if (response.statusCode != 200){
      console.log(`[E009] Error accessing remote data with a status code of ${response.statusCode}.`)
    }
    resolve(body);
  });
});
};

/*
// For debugging
var getTorchValues = require(__dirname + '/getTorchValues.js');
//var getTorchSchema = require(__dirname + '/getTorchSchema.js');
var jp = require('jsonpath');
(async () => {
  //var array = `[\r\n    "chatName",\r\n    "chatColor",\r\n    "noGui"\r\n]`
  //var array = console.log(await getTorchSchema.getTorchSchema('Torch.Server.TorchConfig'));
  
  //All Torch Settings
  var array =   `["shouldUpdatePlugins","shouldUpdateTorch","instanceName","instancePath","noUpdate","forceUpdate","autostart",
  "tempAutostart","restartOnCrash","noGui","waitForPID","getTorchUpdates","getPluginUpdates","tickTimeout","plugins","localPlugins","disconnectOnRestart","chatName","chatColor","enableWhitelist","whitelist",
"windowWidth","windowHeight","fontSize","ugcServiceType","branchName","lastUsedTheme","independentConsole","testPlugin","enableAsserts","sendLogsToKeen","deleteMiniDumps","loginToken"]`
  //console.log(JSON.stringify(array));
  
  console.log(await getTorchValues.getTorchValues('Torch.Server.TorchConfig', array));
})();
*/