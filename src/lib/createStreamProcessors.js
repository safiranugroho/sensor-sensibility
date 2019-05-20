import createStreamProcessor from './createStreamProcessor';

export const Element = {
  LIGHT: 'light',
  HUMIDITY: 'humidity',
  TEMPERATURE: 'temperature',
  RADIATION: 'radiation'
};

export default (name, windowSize = 10) => {
  if (name === 'group_10') windowSize = windowSize * 3;
  if (name === 'group_all') windowSize = windowSize * 5;

  return {
    light: createStreamProcessor(name, Element.LIGHT, windowSize),
    humidity: createStreamProcessor(name, Element.HUMIDITY, windowSize),
    radiation: createStreamProcessor(name, Element.RADIATION, windowSize),
    temperature: createStreamProcessor(name, Element.TEMPERATURE, windowSize)
  }
};