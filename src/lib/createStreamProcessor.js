import { Subject } from 'rxjs';
import { windowCount, map, reduce, mergeAll } from 'rxjs/operators';

import { publishFromStream } from './publishToView';

export default (name, element, windowSize) => {
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
    .subscribe(value =>
      publishFromStream({ name, element, value })
    );

  return subject;
};