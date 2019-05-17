import getSensorGroups, { parseLineToSensorGroup } from './getSensorGroups';

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

describe('getSensorGroups', () => {
  it('should create 11 sensor groups from the csv', async () => {
    const path = 'data/sensor_group_location.csv';
    const sensorGroups = await getSensorGroups(path);

    expect(sensorGroups.length).toEqual(11);
  });
});