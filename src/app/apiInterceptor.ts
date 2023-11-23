import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';



@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private gv: GlobalVariablesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                userId: 'test1@example.com'
            }
        });
        return next.handle(request);

    }
}