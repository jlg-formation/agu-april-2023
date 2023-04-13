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

interval(1000)
  .pipe(
    map((x) => x + 1),
    startWith(0),
    take(5)
  )
  .subscribe({
    next: console.log,
    error: console.log,
    complete: () => console.log("complete"),
  });
