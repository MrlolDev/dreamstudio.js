import {
  textToImg,
  getEngines,
  getUser,
  getBalance,
  imgToimg,
} from '../dist/index.js';
import fs from 'node:fs';

var apiKey = 'your dream studio key';
(async () => {
  var user = await getUser(apiKey);
  //console.log(user);
  var balance = await getBalance(apiKey);
  //console.log(balance);
  var engines = await getEngines(apiKey);
  //console.log(engines);
  /*var images = await textToImg({
    apiKey,
    engineId: 'stable-diffusion-v1-5',
    text_prompts: [
      {
        text: 'a cat in the moon with a space suit, photorealistic, 4k',
        weight: 1,
      },
    ],
  });
  console.log(images);*/
  const initImage = fs.readFileSync('./examples/init_image.png');
  var images = await imgToimg({
    apiKey,
    initImage,
    engineId: 'stable-diffusion-512-v2-0',
    text_prompts: [
      {
        text: 'add a picture of van gogh to the wall',
        weight: 1,
      },
    ],
  });
  fs.writeFile(
    './examples/out.png',
    images.artifacts[0].base64,
    'base64',
    function (err) {
      console.log(err);
    },
  );
})();
