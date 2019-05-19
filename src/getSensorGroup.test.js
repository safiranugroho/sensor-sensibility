import createStreamProcessor from './createStreamProcessor';
import getSensorGroup, { createSensorGroups, createSensorGroup, Element } from './getSensorGroup';

jest.mock('./createStreamProcessor');
createStreamProcessor.mockImplementation((name, element) => ({ name, element }));

describe('getSensorGroup', () => {

  describe('createSensorGroup', () => {

    it('should get create an object from a single line entry from csv', () => {
      const entry = '"group_0","probe-0","-16.876261","145.753509"';
      const sensorGroup = createSensorGroup(entry);

      const name = 'group_0';
      const expectedSensorGroup = {
        name,
        uuidStartsWith: 'probe-0',
        latitude: '-16.876261',
        longitude: '145.753509',
        light: createStreamProcessor(name, Element.LIGHT),
        humidity: createStreamProcessor(name, Element.HUMIDITY),
        radiation: createStreamProcessor(name, Element.RADIATION),
        temperature: createStreamProcessor(name, Element.TEMPERATURE)
      };

      expect(sensorGroup).toEqual(expectedSensorGroup);
    });
  });

  describe('createSensorGroups', () => {

    it('should create 11 sensor groups from the csv', () => {
      const sensorGroups = Object.values(createSensorGroups());
      expect(sensorGroups.length).toEqual(11);
    });
  });

  it('should return the correct sensor group object given a message from the stream', () => {
    const message = {
      "photosensor": "781.25",
      "radiation_level": "198",
      "sensor_uuid": "probe-a0fb2d82",
      "humidity": "83.2294",
      "ambient_temperature": "27.80",
      "timestamp": 1558187301
    };

    const sensorGroup = getSensorGroup(message);
    expect(sensorGroup.name).toEqual('group_10');
  });
});