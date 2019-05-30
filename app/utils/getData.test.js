import getData from './getData';
import { Element } from './enums';

describe('getData', () => {
  it('should take the light, humidity, radiation, and temperature readings ' +
    'from sensorGroups object', () => {
      const { LIGHT, HUMIDITY, RADIATION, TEMPERATURE } = Element;

      const sensorGroup = {
        latitude: '-123.231',
        longitude: '123.231',
        light: 32.1,
        humidity: 12.3,
        radiation: 32.1,
        temperature: 12.3
      };

      const expectedData = [{
        name: LIGHT.text,
        xAxis: Date.now(),
        yAxis: 32.1,
      }, {
        name: HUMIDITY.text,
        xAxis: Date.now(),
        yAxis: 12.3,
      }, {
        name: RADIATION.text,
        xAxis: Date.now(),
        yAxis: 32.1,
      }, {
        name: TEMPERATURE.text,
        xAxis: Date.now(),
        yAxis: 12.3,
      }];

      expect(getData(sensorGroup)).toEqual(expectedData);
    });
});