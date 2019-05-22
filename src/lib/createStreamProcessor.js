import { Subject } from 'rxjs';
import { scan, map } from 'rxjs/operators';

import { publishFromStream } from './publishToView';

export const getWindow = (windowSize) => (values, nextValue) => {
  values.push(nextValue);
  if (values.length > windowSize) values.shift();
  return values;
};

export const roundUp = (value) => Number(value.toFixed(2));
export const sumOf = (values) => values.reduce((prev, next) => prev + next);
export const average = (values) => roundUp(sumOf(values) / values.length);

export default (name, element, windowSize) => {
  const subject = new Subject();

  subject
    .pipe(
      scan(getWindow(windowSize), []),
      map(average)
    )
    .subscribe(value =>
      publishFromStream({ name, element, value })
    );

  return subject;
};