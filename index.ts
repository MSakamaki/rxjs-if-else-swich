import { of, from, Observable, merge } from 'rxjs'; 
import { map, filter } from 'rxjs/operators';


const source = from([1,2,3,4,5,6]);

const caseWhen =
  (match: number, caseFnc: ()=> string ) => (imput$: Observable<number>): Observable<string> => imput$.pipe(
    filter(num => num === match),
    map(caseFnc)
  );

merge(
  source.pipe(caseWhen(1, ()=> 'one')),
  source.pipe(caseWhen(2, ()=> '||')),
  source.pipe(caseWhen(3, ()=> '三')),
  source.pipe(caseWhen(4, ()=> 'フォー')),
  source.pipe(caseWhen(5, ()=> 'ご')),
).subscribe(console.log);


