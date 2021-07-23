import { Observable } from 'rxjs';
export declare function handleTry<T = any>(promise: Promise<T> | Observable<T>): Promise<[T | null, any | null]>;
