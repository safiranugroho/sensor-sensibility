import Element from './Element';
import {
  publishFromStream,
  aggregateDataFromStream
} from './publishToView';

describe('aggregateDataFromStream', () => {
  let initialSensorGroups, dataFromStream, expectedData;
  const assert = () => expect(aggregateDataFromStream(initialSensorGroups, dataFromStream)).toEqual(expectedData);

  it('should use the group name as key for an element-value pair', () => {
    initialSensorGroups = {};

    dataFromStream = {
      name: 'group_1',
      element: Element.LIGHT,
      value: 23.4
    };

    expectedData = {
      group_1: {
        light: 23.4
      }
    };

    assert();
  });

  it('should add a new element-value pair to an existing group name key', () => {
    initialSensorGroups = {
      group_1: {
        light: 23.4
      }
    };

    dataFromStream = {
      name: 'group_1',
      element: Element.HUMIDITY,
      value: 54.9
    };

    expectedData = {
      group_1: {
        light: 23.4,
        humidity: 54.9
      }
    };

    assert();
  });

  it(`should add a new group name as a key if it doesn't exist`, () => {
    initialSensorGroups = {
      group_1: {
        light: 23.4
      }
    };

    dataFromStream = {
      name: 'group_2',
      element: Element.LIGHT,
      value: 32.1
    };

    expectedData = {
      group_1: {
        light: 23.4
      },
      group_2: {
        light: 32.1
      }
    };

    assert();
  });

  it('should replace the existing value if both group name and element exists', () => {
    initialSensorGroups = {
      group_1: {
        light: 23.4
      }
    };

    dataFromStream = {
      name: 'group_1',
      element: Element.LIGHT,
      value: 32.1
    };

    expectedData = {
      group_1: {
        light: 32.1
      }
    };

    assert();
  });
});

describe('publishFromStream', () => {
  jest.spyOn(console, 'log');

  it('should aggregate the data from stream by group and include the location data', () => {
    const dataFromStream = {
      name: 'group_0',
      element: Element.LIGHT,
      value: 32.1
    };

    publishFromStream(dataFromStream);

    const dataSent = {
      group_0: {
        light: 32.1
      }
    }

    const consoleLogArgument = console.log.mock.calls[0][0];
    const consoleLogCalledTimes = console.log.mock.calls.length;

    expect(consoleLogCalledTimes).toEqual(1);
    expect(consoleLogArgument).toEqual(dataSent);
  });
});