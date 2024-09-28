export default function sortFunction(a: number[], b: number[]): number {
  if (a[0] === b[0]) {
    return 0
  } else {
    return a[0] < b[0] ? -1 : 1
  }
}
