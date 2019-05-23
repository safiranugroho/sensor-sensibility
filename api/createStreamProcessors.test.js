import createStreamProcessors from './createStreamProcessors';
import createStreamProcessor from './createStreamProcessor';

jest.mock('./createStreamProcessor');

describe('createStreamProcessor', () => {
  it('should be called four times', () => {
    const name = 'group_1';
    createStreamProcessors(name);

    expect(createStreamProcessor).toBeCalledTimes(4);
  });

  it('should be called with a window size of 50 by default', () => {
    const name = 'group_1';
    createStreamProcessors(name);

    expect(createStreamProcessor).toBeCalledWith(name, expect.any(String), 50);
  });
});