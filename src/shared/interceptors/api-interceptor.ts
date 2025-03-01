import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'http://www.omdbapi.com/';

  if (!req.url.startsWith('http')) {
    const modifiedReq = req.clone({
      url: apiUrl + req.url,
      setParams: { apikey: environment.apiKey },
    });

    return next(modifiedReq);
  }

  return next(req);
};
