import { getWindow, sumOf, average, roundUp } from './createStreamProcessor';

describe('getWindow', () => {
  it('should keep a rolling window of the specified parameter', () => {
    const values = [1, 2];
    const nextValue = 3;

    const expectedWindow = [2, 3];
    const windowSize = 2;

    expect(getWindow(windowSize)(values, nextValue)).toEqual(expectedWindow);
  });
});

describe('sumOf', () => {
  it('should get the sum of the values in the array passed', () => {
    const values = [1, 2, 3];
    const expectedSum = 6;

    expect(sumOf(values)).toEqual(expectedSum);
  })
});

describe('average', () => {
  it('should get the average of the values in the array passed', () => {
    const values = [1, 2, 3];
    const expectedAverage = 2;

    expect(average(values)).toEqual(expectedAverage);
  });
});

describe('roundUp', () => {
  it('should round the value up to 2 decimal points', () => {
    const value = 5.42638;
    const expectedValue = 5.43;

    expect(roundUp(value)).toEqual(expectedValue);
  });
});