import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { xsrfInterceptor } from './core/auth/interceptors/xsrf.interceptor';
import { AuthService } from './core/auth/auth.service';
import { BookService } from './features/collection/services/book.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([xsrfInterceptor])
    ),
    AuthService,
    BookService
  ]
};
