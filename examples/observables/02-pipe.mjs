import { interval, startWith, map } from "rxjs";

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
