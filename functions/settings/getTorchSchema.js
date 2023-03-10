//AMPLink Server Controllers
//Made by sam

const request = require('request');
require('dotenv').config();

exports.getTorchSchema = async function (string) {

  const bearerToken = `${process.env.TORCHREMOTE_TOKEN}`
  const options = {
    url: `${process.env.TORCHREMOTE_ADDRESS}/api/v1/settings/${string}`,
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
// For debugging
var getTorchSchema = require(__dirname + '/getTorchSchema.js');

(async () => {
  console.log(JSON.parse(await getTorchSchema.getTorchSchema('Torch.Server.ViewModels.SessionSettingsViewModel')));
})();
