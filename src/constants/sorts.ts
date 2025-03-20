type WithTimestamp = { timestamp: number };
export const byTimestampAsc = (a: WithTimestamp, b: WithTimestamp) => a.timestamp - b.timestamp;
export const byTimestampDesc = (a: WithTimestamp, b: WithTimestamp) => b.timestamp - a.timestamp;
