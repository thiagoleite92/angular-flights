import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from '../shared/loader/loader.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  requisicoesEmAndamento = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requisicoesEmAndamento++;
    if (this.requisicoesEmAndamento === 1) {
      // this.loadingService.setLoading(true);
    }

    const token = localStorage.getItem('token');
    let novaReq = req;
    if (token) {
      novaReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(novaReq).pipe(
      delay(500), // 2 segundos
      finalize(() => {
        this.requisicoesEmAndamento--;
        if (this.requisicoesEmAndamento === 0) {
          // this.loadingService.setLoading(false);
        }
      })
    );
  }
}
