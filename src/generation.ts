import fetch from 'cross-fetch';
import type { EngineId, IntRange, Payload } from './types.js';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
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
  samples?: IntRange<1, 10>;
  seed?: number;
  steps?: IntRange<10, 150>;
  text_prompts: Array<{
    text: string;
    weight: number;
  }>;
}) {
  const url = `${apiHost}/v1alpha/generation/${engineId}/text-to-image`;
  var id = randomUUID();
  const outputFile = `${process.cwd()}/../.out/${id}.png`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify({
      cfg_scale: cfg_scale,
      clip_guidance_preset: clip_guidance_preset,
      height: height,
      width: width,
      samples: samples,
      seed: seed,
      steps: steps,
      text_prompts: text_prompts,
    }),
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  var json = await response.json();
  return json;
}

export async function getEngines(apiKey: string) {
  const url = `${apiHost}/v1alpha/engines/list`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  // Do something with the payload...
  const payload = (await response.json()) as Payload;
  return payload;
}
