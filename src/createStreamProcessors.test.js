import createStreamProcessors from './createStreamProcessors';
import createStreamProcessor from './createStreamProcessor';

jest.mock('./createStreamProcessor');

describe('createStreamProcessor', () => {
  it('should be called four times', () => {
    const name = 'group_1';
    createStreamProcessors(name);

    expect(createStreamProcessor).toBeCalledTimes(4);
  });

  it('should be called with a window size of 10 by default', () => {
    const name = 'group_1';
    createStreamProcessors(name);

    expect(createStreamProcessor).toBeCalledWith(name, expect.any(String), 10);
  });

  it('should be called with a window size of 30 by if sensor group name is group_10', () => {
    const name = 'group_10';
    createStreamProcessors(name);

    expect(createStreamProcessor).toBeCalledWith(name, expect.any(String), 30);
  });

  it('should be called with a window size of 50 by if sensor group name is group_all', () => {
    const name = 'group_all';
    createStreamProcessors(name);

    expect(createStreamProcessor).toBeCalledWith(name, expect.any(String), 50);
  });
});