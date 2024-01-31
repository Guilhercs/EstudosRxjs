import { Observable, filter, of } from "rxjs";

export interface UserInterface {
  id: string;
  name: string;
  age: number;
  isActivate: boolean;
}

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
