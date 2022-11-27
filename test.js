const simplefunction = (x) => {
  if (x % 2 === 0) {
    // calling another function to check if the number is less than 10
    const y = anotherFunction(x);
    if (y) {
      return true;
    }
  }
  return false;
};

/**
 *
 * @param {*} inputNumber
 * @returns true if a number is even and less than 10
 */
const simpleFunctionClean = (inputNumber) => {
  if (inputNumber % 2 !== 0) {
    return false;
  }
  const result = isLessThan10(inputNumber);
  if (result) {
    return true;
  }
  return false;
};
