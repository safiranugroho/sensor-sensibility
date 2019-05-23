import Element from './Element';
import createStreamProcessor from './createStreamProcessor';

export default (name, windowSize = 50) => ({
  light: createStreamProcessor(name, Element.LIGHT, windowSize),
  humidity: createStreamProcessor(name, Element.HUMIDITY, windowSize),
  radiation: createStreamProcessor(name, Element.RADIATION, windowSize),
  temperature: createStreamProcessor(name, Element.TEMPERATURE, windowSize)
});