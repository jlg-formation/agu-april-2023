import { interval, Observable, startWith, take } from "rxjs";

const map = (func) => {
  return (obs) => {
    return new Observable((subscriber) => {
      const subscription = obs.subscribe({
        next: (x) => {
          subscriber.next(func(x));
        },
        error: (err) => {
          subscriber.error(err);
        },
        complete: () => {
          subscriber.complete();
        },
      });

      return () => {
        console.log("unsubscribe");
        subscription.unsubscribe();
      };
    });
  };
};

// Si on n'avait le pipe...
// take(5)(startWith(0)(map((x) => x + 1)(interval(1000)))).subscribe({
//   next: console.log,
//   error: console.log,
//   complete: () => console.log("complete"),
// });

interval(1000)
  .pipe(
    map((x) => x + 1),
    startWith(0)
  )
  .subscribe({
    next: console.log,
    error: console.log,
    complete: () => console.log("complete"),
  });
