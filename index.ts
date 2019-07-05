import { of, from, Observable, merge } from 'rxjs'; 
import { map, filter, tap, switchMap } from 'rxjs/operators';

const source = from([1,2,3,4,5,6,7,8,9,10]);

const caseWhen =
  (match: number, caseFnc: ()=> string ) => (imput$: Observable<number>): Observable<string> => imput$.pipe(
    filter(num => num === match),
    map(caseFnc)
  );
merge(
  source.pipe(caseWhen(1, ()=> '.')),
  source.pipe(caseWhen(2, ()=> '..')),
  source.pipe(caseWhen(3, ()=> '...')),
  source.pipe(caseWhen(4, ()=> '....')),
  source.pipe(caseWhen(5, ()=> '.....')),
).subscribe(console.log);

interface Param {
  min: number;
  max: number;
  result: string;
}

const mergeWhen = (params:Param[]) => (imput$: Observable<number>): Observable<string> =>
  imput$.pipe(
    map(n => params.find(param => param.min <= n && param.max >= n)),
    filter(Boolean),
    map(cs => cs.result)
  );

source.pipe(
  mergeWhen([{
    min: 1, max: 3, result: '|'
  }, {
    min: 6, max: 8, result: '--'
  }, {
    min: 7, max: 10, result: '/'
  }])
).subscribe(console.log);
