export const WAD_PRECISION = 18n;
export const RAY_PRECISION = 27n;

export const WAD = 10n ** WAD_PRECISION;
export const HALF_WAD = WAD / 2n;

export const RAY = 10n ** RAY_PRECISION;
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

export const toRay = (a: bigint, decimals: number) => {
  const scaleDifference = RAY_PRECISION - BigInt(decimals);

  if (scaleDifference > 0n) {
    return a * 10n ** scaleDifference;
  }

  throw new Error(`Passed decimals is greater than ${RAY_PRECISION}, it is not possible to convert to Ray yet`);
};
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

export const toWad = (a: bigint, decimals: number) => {
  const scaleDifference = WAD_PRECISION - BigInt(decimals);

  if (scaleDifference >= 0n) {
    return a * 10n ** scaleDifference;
  }

  throw new Error(`Passed decimals is greater than ${WAD_PRECISION}, use toRay instead`);
};

export const fromWad = (amountWAD: bigint, targetDecimals: number) => {
  const scaleDifference = WAD_PRECISION - BigInt(targetDecimals);

  if (scaleDifference >= 0n) {
    return amountWAD / 10n ** scaleDifference;
  }

  throw new Error(`Passed decimals is greater than ${WAD_PRECISION}, use fromRay instead`);
};

export const floatToWad = (value: number | string) => {
  const decimalString = typeof value === "number" ? String(value) : value;
  const [integerPart, fractionalPart = ""] = decimalString.split(".");
  const combinedString = integerPart + fractionalPart;

  if (combinedString === "") {
    return 0n;
  }

  const combinedBigInt = BigInt(combinedString);
  const originalDecimals = fractionalPart.length;
  const scaleDifference = WAD_PRECISION - BigInt(originalDecimals);

  if (scaleDifference >= 0n) {
    return combinedBigInt * 10n ** scaleDifference;
  } else {
    return combinedBigInt / 10n ** BigInt(-scaleDifference);
  }
};

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
