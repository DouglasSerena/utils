export const BIT_SIZES = {
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776,
};
export const RESOLUTION_WIDTH = {
  HD: 1280,
  HD_MORE: 1366,
  FULL_HD: 1920,
  QUAD_HD: 2560,
  UHD: 3840,
};
export const RESOLUTION_HEIGHT = {
  HD: 720,
  HD_MORE: 768,
  FULL_HD: 1080,
  QUAD_HD: 1440,
  UHD: 2160,
};

export const isFile = (file: unknown): file is File => file instanceof File;
