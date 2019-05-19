import { Subject } from 'rxjs';
import { windowCount, map, reduce, mergeAll } from 'rxjs/operators';

export const Element = {
  LIGHT: 'light',
  HUMIDITY: 'humidity',
  TEMPERATURE: 'temperature',
  RADIATION: 'radiation'
};

export const createStreamProcessor = (name, element, windowSize) => {
  const subject = new Subject();

  subject
    .pipe(
      windowCount(windowSize),
      map(window => window.pipe(
        reduce((prevValue, nextValue) => prevValue + nextValue),
        map(value => value / windowSize)
      )),
      mergeAll()
    )
    .subscribe(value => console.log(`${name} - ${element}: ${value.toFixed(2)}`));;

  return subject;
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