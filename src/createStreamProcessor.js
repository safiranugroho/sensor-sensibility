import { Subject } from 'rxjs';
import { windowCount, map, reduce, mergeAll } from 'rxjs/operators';

export default (name, element, count = 10) => {
  const subject = new Subject();
  if (name === 'group_10') count = count * 3;

  subject
    .pipe(
      windowCount(count),
      map(window => window.pipe(
        reduce((acc, value) => acc + value),
        map(value => value / count)
      )),
      mergeAll()
    )
    .subscribe(value => console.log(`${name} - ${element}: ${value.toFixed(2)}`));;

  return subject;
};