import getSensorGroups, { parseLineToSensorGroup } from './getSensorGroups';


describe('getSensorGroups', () => {

  describe('parseLineToSensorGroup', () => {

    it('should get create an object from a single line entry', () => {
      const entry = '"group_0","probe-0","-16.876261","145.753509"';
      const sensorGroup = parseLineToSensorGroup(entry);

      const expectedSensorGroup = {
        name: 'group_0',
        uuidStartsWith: 'probe-0',
        latitude: '-16.876261',
        longitude: '145.753509'
      };

      expect(sensorGroup).toEqual(expectedSensorGroup);
    });
  });

  it('should create 11 sensor groups from the csv', () => {
    const path = 'data/sensor_group_location.csv';
    const sensorGroups = getSensorGroups(path);

    expect(sensorGroups.length).toEqual(11);
  });
});