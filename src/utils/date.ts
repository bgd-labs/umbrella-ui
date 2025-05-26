export const toUnix = (data: Date = new Date()) => {
  return Math.floor(data.getTime() / 1000);
};

export const getCurrentUnixTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
