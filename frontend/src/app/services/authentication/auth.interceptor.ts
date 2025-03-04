// /*
// This file was made with the help of ChatGPT
//  */
//
// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandler, HttpHeaderResponse,
//   HttpInterceptor, HttpProgressEvent,
//   HttpRequest, HttpResponse,
//   HttpSentEvent, HttpUserEvent
// } from "@angular/common/http";
// import {Injectable} from "@angular/core";
// import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
// import {JwtServiceService} from "./jwt-service.service";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptor implements HttpInterceptor{
//
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
//
//   constructor(private jwtService: JwtServiceService) {
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.jwtService.getToken();
//
//     let clonedRequest = request;
//
//     if (token) {
//       clonedRequest = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//     }
//
//     return next.handle(clonedRequest).pipe(
//       // @ts-ignore
//       catchError((e) => {
//         if (e instanceof HttpErrorResponse && e.status === 403){
//           return this.handle403error(request, next);
//         }
//         return throwError(() => e);
//       })
//     )
//   }
//
//   private handle403error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpResponse<any> | HttpProgressEvent | HttpUserEvent<any>> | unknown {
//     if (!this.isRefreshing){
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//
//       return this.jwtService.refreshToken().pipe(
//         switchMap((token: any) => {
//           this.isRefreshing = false;
//           this.refreshTokenSubject.next(token.access_token);
//           return next.handle(this.addToken(request, token.access_token));
//         },
//           catchError((e) => {
//             this.isRefreshing = false;
//             this.jwtService.logout();
//             return throwError(() => e);
//           }))
//       )
//     } else {
//       return this.refreshTokenSubject.pipe(
//         filter(token => token !== null),
//         take(1),
//         switchMap(token => next.handle(this.addToken(request, token!)))
//       );
//     }
//   }
//
//   private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
//     return request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }
// }
