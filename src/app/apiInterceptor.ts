import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';




@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private gv: GlobalVariablesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var log = localStorage.getItem('log')? JSON.parse(localStorage.getItem('log')).token: null
        request = request.clone({
            setHeaders: {
                Authorization: String('Bearer ' + log),
                userId: 'vinothkumar.b@chryselys.com'
            }
        });
        return next.handle(request);
    }
}