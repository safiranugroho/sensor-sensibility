import getData from './getData';

describe('getData', () => {
  it('should take the light, humidity, radiation, and temperature readings ' +
    'from sensorGroups object', () => {
      const sensorGroups = {
        group_0: {
          latitude: '-123.231',
          longitude: '123.231',
          light: 32.1,
          humidity: 12.3,
          radiation: 32.1,
          temperature: 12.3
        }
      };

      const expectedData = {
        group_0: [{
          name: 'light',
          x: Date.now(),
          y: 32.1,
        }, {
          name: 'humidity',
          x: Date.now(),
          y: 12.3,
        }, {
          name: 'radiation',
          x: Date.now(),
          y: 32.1,
        }, {
          name: 'temperature',
          x: Date.now(),
          y: 12.3,
        }]
      };

      expect(getData(sensorGroups)).toEqual(expectedData);
    });
});