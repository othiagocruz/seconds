export function decreaser(node: Node, { speed = 1000 }) {
  const start = parseInt(node.textContent || "175") + 1;
  return {
    duration: speed * start,
    tick: (t: number) => {
      node.textContent = Math.trunc(start - t * start).toString();
    }
  };
}
