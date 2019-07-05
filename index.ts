import { of, from, Observable, merge } from 'rxjs'; 
import { map, filter, tap, switchMap } from 'rxjs/operators';

interface Param {
  min: number;
  max: number;
  result: string;
}

const source = from([1,2,3,4,5,6,7,8,9,10]);


const caseWhen =
  (min: number, max: number, result:string ) => (imput$: Observable<number>): Observable<string> => imput$.pipe(
    filter(n =>  min <= n && max >= n),
    map(()=> result)
  );
merge(
  source.pipe(caseWhen(1, 3, '.')),
  source.pipe(caseWhen(2, 5, '..')),
  source.pipe(caseWhen(8, 9, '...')),
).subscribe(console.log);


const mergeWhen = (params:Param[]) => (imput$: Observable<number>): Observable<string> =>
  imput$.pipe(
    map(n => params.find(param => param.min <= n && param.max >= n)),
    filter(Boolean),
    map(cs => cs.result)
  );
source.pipe(
  mergeWhen([{
    min: 1, max: 3, result: '-'
  }, {
    min: 6, max: 8, result: '--'
  }, {
    min: 7, max: 10, result: '---'
  }])
).subscribe(console.log);


const findMap =
  (find:{ [match: number]: string }) => (imput$: Observable<number>): Observable<string> => imput$.pipe(
    map((n)=> find[n]),
    filter(Boolean),
  )
source.pipe(
  findMap({
    1: 'A',
    2: 'A',
    3: 'A',
    5: 'B',
    6: 'B',
    8: 'C',
    10: 'C',
  })
).subscribe(console.log);
