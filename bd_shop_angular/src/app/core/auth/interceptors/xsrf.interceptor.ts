import { HttpInterceptorFn } from '@angular/common/http';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {

  let token = null
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    if (cookie.startsWith('XSRF-TOKEN=')) {
      token = decodeURIComponent(cookie.substring('XSRF-TOKEN='.length))
    }
  }

  if (token === null) {
    return next(req);
  }

  const request = req.clone({
    setHeaders: { 'X-XSRF-TOKEN': token }
  })

  return next(request)
};
