const { Observable } = require("rxjs");

// cold observable
const obs = new Observable((subscriber) => {
  subscriber.next({ x: 23 });
  subscriber.next("toto");
  subscriber.next(undefined);
  const timer = setTimeout(() => {
    console.log("ca y est j'envoie le reste");
    subscriber.next(123);

    subscriber.error("oups");
  }, 1000);

  return () => {
    console.log("ok je me tue");
    clearTimeout(timer);
  };
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

const subscription = obs.subscribe(observer);

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
