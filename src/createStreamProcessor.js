import { Subject } from 'rxjs';
import { windowCount, map, reduce, mergeAll } from 'rxjs/operators';

export default (name, count = 10) => {
  const subject = new Subject();

  subject
    .pipe(
      windowCount(count),
      map(window => window.pipe(
        reduce((acc, value) => acc + value),
        map(value => value / count)
      )),
      mergeAll()
    )
    .subscribe(value => console.log(`${name}: ${value.toFixed(2)}`));;

  return subject;
};