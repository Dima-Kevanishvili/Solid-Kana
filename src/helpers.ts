// The maximum is exclusive and the minimum is inclusive
const getRandomInt = (
  min: number,
  max: number,
  excludedNumbers?: number[]
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min) + min);
  if (excludedNumbers !== undefined && excludedNumbers.includes(randNum)) {
    return getRandomInt(min, max, excludedNumbers);
  }
  return randNum;
};

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export { getRandomInt, shuffleArray };
