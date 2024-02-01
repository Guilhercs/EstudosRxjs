import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  combineLatest,
  filter,
  map,
  of,
} from "rxjs";

export interface UserInterface {
  id: string;
  name: string;
  age: number;
  isActivate: boolean;
}

//filter com every
function getActiveUsers(
  users$: Observable<UserInterface[]>
): Observable<UserInterface[]> {
  return users$.pipe(filter((users) => users.every((user) => user.isActivate)));
}

const users$: Observable<UserInterface[]> = of([
  { id: "1", name: "Joao Banana", age: 12, isActivate: true },
]);

getActiveUsers(users$).subscribe((activeUsers) => {
  console.log(activeUsers);
});

//implement error Handling

const normalizeUsers = (
  users$: Observable<UserInterface[]>
): Observable<string[]> => {
  //throw Error("error");
  return users$.pipe(
    map((users) => users.map((user) => user.name)),
    catchError((err) => {
      console.log("err", err);
      return of([]);
    })
  );
};

normalizeUsers(users$).subscribe({
  next: (res) => {
    console.log(res);
  },

  error: (err) => {
    console.log("err", err);
  },
});

//combineLatest operator
export class CombineLatest {
  constructor() {
    const foo$ = of("foo"); //interval(3000);
    const baz$ = of("baz");
    const bar$ = of("bar");
    combineLatest([foo$, bar$, baz$]).subscribe((res) => console.log(res));
  }
}

const combineClass = new CombineLatest();
combineClass;

//how subject and BehaviorSubject work in Rxjs

const usersBH$ = new BehaviorSubject<UserInterface[]>([]);

const subject$ = new Subject();

subject$.subscribe((res) => console.log("subject", res));

setTimeout(() => {
  usersBH$.next([{ id: "1", name: "Banana", age: 12, isActivate: true }]);
  subject$.next(1);
}, 2000);

usersBH$.subscribe((res) => console.log("res", res, usersBH$.getValue()));
