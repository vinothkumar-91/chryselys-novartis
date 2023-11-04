import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';



@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private gv: GlobalVariablesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const user = this.gv.userDetail;
        if (user && user.token && String(user.token)) {
            // console.log(user.ta)
            request = request.clone({
                setHeaders: {
                    Authorization: String('Bearer ' + user.token),
                    // ta: '{"Oncology":["Lung Cancer"]}'
                    ta: JSON.stringify(user.ta)
                    // email: String((user.email) ? user.data.email : ""),
                    // role: String((user.role) ? user.role : ""),
                }
            });
            return next.handle(request);
        } else {
            request = request.clone({
                setHeaders: { Authorization: `Authorization` }
            });
            return next.handle(request);
        }

    }
}