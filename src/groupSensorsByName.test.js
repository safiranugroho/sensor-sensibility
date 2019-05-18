import groupSensorsByName, { getSensorGroupName } from './groupSensorsByName';

describe('groupSensorsByName', () => {

  describe('getSensorGroupName', () => {

    it('should get the sensor group number based on the number on UUID', () => {
      const data = {
        sensor_uuid: 'probe-97af9fbd',
      };

      expect(getSensorGroupName(data)).toEqual('group_9');
    });

    it('should be in group_10 if UUID starts with an alphabet', () => {
      const data = {
        sensor_uuid: 'probe-f4cf004a',
      };

      expect(getSensorGroupName(data)).toEqual('group_10');
    });
  });

  it('should return a key-value array with the group name as key' +
    'and an array of data as value', () => {
      const data = [
        {
          photosensor: '769.60',
          sensor_uuid: 'probe-09c7286f',
          timestamp: 1558166356
        },
        {
          photosensor: '757.76',
          sensor_uuid: 'probe-4720fb36',
          timestamp: 1558166356
        },
        {
          photosensor: '784.10',
          sensor_uuid: 'probe-03943bf3',
          timestamp: 1558166356
        },
        {
          photosensor: '790.45',
          sensor_uuid: 'probe-d9ab727e',
          timestamp: 1558166356
        },
        {
          photosensor: '831.64',
          sensor_uuid: 'probe-a1168318',
          timestamp: 1558166355
        }
      ];

      const expectedResult = [];
      expectedResult['group_0'] = [
        {
          photosensor: '769.60',
          sensor_uuid: 'probe-09c7286f',
          timestamp: 1558166356
        },
        {
          photosensor: '784.10',
          sensor_uuid: 'probe-03943bf3',
          timestamp: 1558166356
        }
      ];

      expectedResult['group_4'] = [
        {
          photosensor: '757.76',
          sensor_uuid: 'probe-4720fb36',
          timestamp: 1558166356
        }
      ];

      expectedResult['group_10'] = [
        {
          photosensor: '790.45',
          sensor_uuid: 'probe-d9ab727e',
          timestamp: 1558166356
        },
        {
          photosensor: '831.64',
          sensor_uuid: 'probe-a1168318',
          timestamp: 1558166355
        }
      ];

      expect(groupSensorsByName(data)).toEqual(expectedResult);
    });
});