declare module 'sort-by' {
  const sortBy: (...args: string[]) => (a: T, b: T) => number;
  export default sortBy;
}