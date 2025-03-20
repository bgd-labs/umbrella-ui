export function textCenterEllipsis(str: string, from: number, to: number) {
  const text = str || "";
  return `${text.slice(0, from)}...${text.slice(-to)}`;
}
