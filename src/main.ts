import {
  Observable,
  catchError,
  combineLatest,
  filter,
  interval,
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
