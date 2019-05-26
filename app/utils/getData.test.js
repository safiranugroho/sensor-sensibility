import Element from './Element';
import getData from './getData';

describe('getData', () => {
  it('should take the light, humidity, radiation, and temperature readings ' +
    'from sensorGroups object', () => {
      const sensorGroup = {
        latitude: '-123.231',
        longitude: '123.231',
        light: 32.1,
        humidity: 12.3,
        radiation: 32.1,
        temperature: 12.3
      };

      const expectedData = [{
        name: Element.LIGHT,
        xAxis: Date.now(),
        yAxis: 32.1,
      }, {
        name: Element.HUMIDITY,
        xAxis: Date.now(),
        yAxis: 12.3,
      }, {
        name: Element.RADIATION,
        xAxis: Date.now(),
        yAxis: 32.1,
      }, {
        name: Element.TEMPERATURE,
        xAxis: Date.now(),
        yAxis: 12.3,
      }];

      expect(getData(sensorGroup)).toEqual(expectedData);
    });
});