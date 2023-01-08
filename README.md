<div align="center">
  <br />
  <h1>dreamstudio.js </h1>
  <br />
  <p>
    <a href="https://dsc.gg/turing" target="_blank"><img src="https://img.shields.io/discord/899761438996963349?color=5865F2&logo=discord&logoColor=white&style=for-the-badge" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/dreamstudio.js" target="_blank"><img src="https://img.shields.io/npm/v/dreamstudio.js.svg?style=for-the-badge" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/dreamstudio.js" target="_blank"><img src="https://img.shields.io/npm/dw/dreamstudio.js?style=for-the-badge" alt="npm downloads" /></a>
  </p>
</div>

## Installation

```
npm i dreamstudio.js

pnpm add dreamstudio.js

yarn add dreamstudio.js
```

## Usage

### Generate images:

#### Text to image

It would log an object with the property artifacts that contains an array of the images. Every image object have the base64 property which is the image.

```typescript
import { textToImg } from 'dreamstudio.js';
var apiKey = 'your dreamstudio api key';
(async () => {
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
  console.log(images.artifacts);
})();
```

##### Engines list:

| Id                         | Name                      | Type    |
| -------------------------- | ------------------------- | ------- |
| stable-diffusion-v1        | Stable Diffusion v1.4     | PICTURE |
| stable-diffusion-v1-5      | Stable Diffusion v1.5     | PICTURE |
| stable-diffusion-512-v2-0  | Stable Diffusion v2.0     | PICTURE |
| stable-diffusion-768-v2-0  | Stable Diffusion v2.0-768 | PICTURE |
| stable-diffusion-512-v2-1  | 'Stable Diffusion v2.1    | PICTURE |
| stable-diffusion-768-v2-1  | Stable Diffusion v2.1-768 | PICTURE |
| stable-inpainting-v1-0     | Stable Inpainting v1.0    | PICTURE |
| stable-inpainting-512-v2-0 | Stable Inpainting v2.0    | PICTURE |

##### Options:

| Option Name          | Type   | Default | Required |
| -------------------- | ------ | ------- | -------- |
| apiKey               | string | none    | true     |
| engineId             | string | none    | true     |
| cfg_scale            | number | 7       | false    |
| clip_guidance_preset | string | NONE    | false    |
| width                | number | 512     | false    |
| height               | number | 512     | false    |
| samples              | number | 1       | false    |
| seed                 | number | random  | false    |
| steps                | number | 50      | false    |
| text_prompts         | Array  | none    | true     |

#### Image to image

It would log an object with the property artifacts that contains an array of the images. Every image object have the base64 property which is the image.

```typescript
import { textToImg } from 'dreamstudio.js';
var apiKey = 'your dreamstudio api key';
(async () => {
  const initImage = fs.readFileSync('./examples/init_image.png'); // the initial image path
  var images = await textToImg({
    apiKey,
    initImage,
    engineId: 'stable-inpainting-512-v2-0',
    text_prompts: [
      {
        text: 'add a picture of van gogh to the wall',
        weight: 1,
      },
    ],
  });
  fs.writeFile('./examples/out.png', images.artifacts[0].base64, 'base64'); // save the result
})();
```

##### Engines list:

| Id                         | Name                      | Type    |
| -------------------------- | ------------------------- | ------- |
| stable-diffusion-v1        | Stable Diffusion v1.4     | PICTURE |
| stable-diffusion-v1-5      | Stable Diffusion v1.5     | PICTURE |
| stable-diffusion-512-v2-0  | Stable Diffusion v2.0     | PICTURE |
| stable-diffusion-768-v2-0  | Stable Diffusion v2.0-768 | PICTURE |
| stable-diffusion-512-v2-1  | 'Stable Diffusion v2.1    | PICTURE |
| stable-diffusion-768-v2-1  | Stable Diffusion v2.1-768 | PICTURE |
| stable-inpainting-v1-0     | Stable Inpainting v1.0    | PICTURE |
| stable-inpainting-512-v2-0 | Stable Inpainting v2.0    | PICTURE |

##### Options:

| Option Name          | Type   | Default | Required |
| -------------------- | ------ | ------- | -------- |
| apiKey               | string | none    | true     |
| engineId             | string | none    | true     |
| cfg_scale            | number | 7       | false    |
| clip_guidance_preset | string | NONE    | false    |
| width                | number | 512     | false    |
| height               | number | 512     | false    |
| samples              | number | 1       | false    |
| seed                 | number | random  | false    |
| steps                | number | 50      | false    |
| text_prompts         | Array  | none    | true     |

#### Image to image/Masking

Under development

### User information:

```typescript
import { getUser, getBalance } from 'dreamstudio.js';
var apiKey = 'your dreamstudio api key';
(async () => {
  var user = await getUser(apiKey);
  console.log(user);
  var balance = await getBalance(apiKey);
  console.log(balance);
})();
```

### Get engines list:

```typescript
import { getEngines } from 'dreamstudio.js';
var apiKey = 'your dreamstudio api key';
(async () => {
  var engines = await getEngines(apiKey);
  console.log(engines);
})();
```

## To do list:

- [x] User data
- [x] Engines list
- [x] Text to image
- [ ] Image to image
- [ ] Image to image/masking
- [ ] Improve error messages
