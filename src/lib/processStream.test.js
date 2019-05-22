import * as processStream from './processStream';
import Element from './Element';
import getSensorGroup, { getGeneralGroup } from './getSensorGroup';

jest.mock('./getSensorGroup');

describe('processStream', () => {
  const mockStreamProcessors = {
    light: { next: jest.fn() },
    humidity: { next: jest.fn() },
    radiation: { next: jest.fn() },
    temperature: { next: jest.fn() },
  };

  const message = {
    "photosensor": "781.25",
    "radiation_level": "198",
    "sensor_uuid": "probe-10fb2d82",
    "humidity": "83.2294",
    "ambient_temperature": "27.80",
    "timestamp": 1558187301
  };

  const streamProcessorsToTest =
    [{
      element: Element.LIGHT,
      streamProcessor: mockStreamProcessors.light,
      value: Number(message.photosensor)
    },
    {
      element: Element.HUMIDITY,
      streamProcessor: mockStreamProcessors.humidity,
      value: Number(message.humidity)
    },
    {
      element: Element.RADIATION,
      streamProcessor: mockStreamProcessors.radiation,
      value: Number(message.radiation_level)
    },
    {
      element: Element.TEMPERATURE,
      streamProcessor: mockStreamProcessors.temperature,
      value: Number(message.ambient_temperature)
    }];

  beforeEach(jest.clearAllMocks);

  describe('bySensorGroup', () => {
    beforeEach(() => {
      getSensorGroup.mockReturnValue(mockStreamProcessors);
    });

    streamProcessorsToTest.forEach(({ element, streamProcessor, value }) => {
      it(`should call the next function of the ${element} stream processor ` +
        'attached to that sensor group', () => {
          processStream.bySensorGroup(message);

          expect(getSensorGroup).toBeCalledTimes(1);

          expect(streamProcessor.next).toBeCalledTimes(1);
          expect(streamProcessor.next).toBeCalledWith(value);
        });
    });

  });

  describe('acrossAllGroups', () => {
    beforeEach(() => {
      getGeneralGroup.mockReturnValue(mockStreamProcessors);
    });

    streamProcessorsToTest.forEach(({ element, streamProcessor, value }) => {
      it(`should call the next function of the ${element} stream processor ` +
        'attached to the general sensor group', () => {
          processStream.acrossAllGroups(message);

          expect(getGeneralGroup).toBeCalledTimes(1);

          expect(streamProcessor.next).toBeCalledTimes(1);
          expect(streamProcessor.next).toBeCalledWith(value);
        });
    });
  })
});