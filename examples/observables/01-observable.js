const { Observable } = require("rxjs");

const obs = new Observable((subscriber) => {
  subscriber.next({ x: 23 });
  subscriber.next("toto");
  subscriber.next(undefined);
  setTimeout(() => {
    subscriber.next(123);

    subscriber.complete();
  }, 1000);
});

const observer = {
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

obs.subscribe(observer);
