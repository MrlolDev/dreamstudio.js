import { textToImg, getEngines, getUser, getBalance } from '../dist/index.js';
var apiKey = 'your dreamstudio api key';
(async () => {
  var user = await getUser(apiKey);
  //console.log(user);
  var balance = await getBalance(apiKey);
  //console.log(balance);
  var engines = await getEngines(apiKey);
  //console.log(engines);
  var images = await textToImg({
    apiKey,
    engineId: 'stable-diffusion-v1-5',
    text_prompts: [
      {
        text: 'a cat in the moon with a space suit, photorealistic, 4k',
        weight: 1,
      },
    ],
  });
  console.log(images);
})();
