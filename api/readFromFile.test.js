import readFromFile from './readFromFile';

describe('readFromFile', () => {
  beforeEach(jest.clearAllMocks);

  it('should call the callback function passed 12 times ' +
    '(based on how many lines are in the csv) and returns an array', () => {
      const mockCallback = jest.fn();
      const data = readFromFile(mockCallback);

      expect(mockCallback).toBeCalledTimes(12);
      expect(data).toEqual(expect.any(Array));
    });
});