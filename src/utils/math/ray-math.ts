export const WAD = 10n ** 18n;
export const HALF_WAD = WAD / 2n;

export const RAY = 10n ** 27n;
export const HALF_RAY = RAY / 2n;

export const WAD_RAY_RATIO = 10n ** 9n;

export function rayMul(a: bigint, b: bigint): bigint {
  return (a * b + HALF_RAY) / RAY;
}

export function rayDiv(a: bigint, b: bigint): bigint {
  const halfB = b / 2n;

  return (halfB + a * RAY) / b;
}

export function rayToWad(a: bigint): bigint {
  const halfRatio = WAD_RAY_RATIO / 2n;

  return (halfRatio + a) / WAD_RAY_RATIO;
}

export function wadToRay(a: bigint): bigint {
  return a * WAD_RAY_RATIO;
}

export function wadMul(a: bigint, b: bigint): bigint {
  return (a * b + HALF_WAD) / WAD;
}

export function wadDiv(a: bigint, b: bigint): bigint {
  const halfB = b / 2n;

  return (halfB + a * WAD) / b;
}

export const rayDivRoundDown = (a: bigint, b: bigint) => {
  return (a * RAY) / b;
};

export const rayDivRoundUp = (a: bigint, b: bigint) => {
  return (a * RAY + b - BigInt(1)) / b;
};

export const rayMulRoundDown = (a: bigint, b: bigint) => {
  if (a === BigInt(0) || b === BigInt(0)) {
    return BigInt(0);
  }
  return (a * b) / RAY;
};

export const rayMulRoundUp = (a: bigint, b: bigint) => {
  if (a === BigInt(0) || b === BigInt(0)) {
    return BigInt(0);
  }
  return (a * b + RAY - BigInt(1)) / RAY;
};
