export const rnd = (maxNumber = 100) => {
  const random = Math.random();

  const result = Math.floor(random * maxNumber + 1);

  console.log(result);

  return result;
}
