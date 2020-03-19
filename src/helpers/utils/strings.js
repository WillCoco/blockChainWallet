export const shorten = (v, head = 6, tail = 6) =>
  typeof v === 'string' ? `${v.slice(0, head)}...${v.slice(-tail)}` : '';
