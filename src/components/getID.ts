export const getID = (id: number = 0) => {
  return () => ++id;
}