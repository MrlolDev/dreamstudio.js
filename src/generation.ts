import axios from 'axios';
import type { EngineId, IntRange, Payload } from './types.js';
import FormData from 'form-data';
const apiHost = 'https://api.stability.ai';

export async function textToImg({
  apiKey,
  engineId,
  cfg_scale = 7,
  clip_guidance_preset = 'NONE',
  width = 512,
  height = 512,
  samples = 1,
  seed,
  steps = 50,
  text_prompts,
}: {
  apiKey: string;
  engineId: EngineId;
  cfg_scale?: number;
  clip_guidance_preset?:
    | 'NONE'
    | 'FAST_BLUE'
    | 'FAST_GREEN'
    | 'SIMPLE'
    | 'SLOW'
    | 'SLOWER'
    | 'SLOWEST';
  width?: number;
  height?: number;
  samples?: IntRange<1, 11>;
  seed?: number;
  steps?: number;
  text_prompts: Array<{
    text: string;
    weight: number;
  }>;
}) {
  const url = `${apiHost}/v1alpha/generation/${engineId}/text-to-image`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await axios.post(
    url,
    {
      cfg_scale: cfg_scale,
      clip_guidance_preset: clip_guidance_preset,
      height: height,
      width: width,
      samples: samples,
      seed: seed,
      steps: steps,
      text_prompts: text_prompts,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: apiKey,
      },
    },
  );

  if (response.status !== 200) {
    throw new Error(`Non-200 response: ${await response.statusText}`);
  }

  var json = await response.data;
  return json;
}

export async function imgToimg({
  apiKey,
  engineId,
  cfg_scale = 7,
  clip_guidance_preset = 'NONE',
  step_schedule_start = 0.6,
  step_schedule_end = 0.01,
  width = 512,
  height = 512,
  samples = 1,
  seed,
  steps = 50,
  text_prompts,
  initImage,
}: {
  apiKey: string;
  engineId: EngineId;
  cfg_scale?: number;
  clip_guidance_preset?:
    | 'NONE'
    | 'FAST_BLUE'
    | 'FAST_GREEN'
    | 'SIMPLE'
    | 'SLOW'
    | 'SLOWER'
    | 'SLOWEST';
  step_schedule_start?: number;
  step_schedule_end?: number;
  width?: number;
  height?: number;
  samples?: IntRange<1, 10>;
  seed?: number;
  steps?: IntRange<10, 150>;
  text_prompts: Array<{
    text: string;
    weight: number;
  }>;
  initImage: Buffer;
}) {
  const url = `${apiHost}/v1alpha/generation/${engineId}/image-to-image`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const formData = new FormData();
  formData.append('init_image', initImage);
  formData.append(
    'options',
    JSON.stringify({
      cfg_scale: cfg_scale,
      clip_guidance_preset: clip_guidance_preset,
      step_schedule_start: step_schedule_start,
      step_schedule_end: step_schedule_end,
      height: height,
      width: width,
      samples: samples,
      steps: steps,
      seed: seed,
      text_prompts: text_prompts,
    }),
  );

  const response = await axios({
    url: url,
    data: formData,
    method: 'post',
    headers: {
      ...formData.getHeaders(),
      Accept: 'application/json',
      Authorization: apiKey,
    },
  });

  if (response.status != 200) {
    if (response.data) {
      throw new Error(`Non-200 response: ${response.data.message}`);
    } else {
      throw new Error(`Non-200 response: ${response.statusText}`);
    }
  }

  var json = response.data;
  return json;
}

export async function getEngines(apiKey: string) {
  const url = `${apiHost}/v1alpha/engines/list`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await axios.get(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (response.status != 200) {
    throw new Error(`Non-200 response: ${response.statusText}`);
  }

  // Do something with the payload...
  const payload = response.data as Payload;
  return payload;
}
