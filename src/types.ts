export type EngineId =
  | 'stable-diffusion-v1'
  | 'stable-diffusion-v1-5'
  | 'stable-diffusion-512-v2-0'
  | 'stable-diffusion-768-v2-0'
  | 'stable-diffusion-512-v2-1'
  | 'stable-diffusion-768-v2-1'
  | 'stable-inpainting-v1-0'
  | 'stable-inpainting-512-v2-0';
type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface User {
  id: string;
  profile_picture: string;
  email: string;
  organizations?: Array<{
    id: string;
    name: string;
    role: string;
    is_default: boolean;
  }>;
}

export interface Balance {
  credits: number;
}
export interface Payload {
  engines: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
  }>;
}
