import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/inerceptors/headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor])),
    provideToastr({
      progressBar: true,
      closeButton: true,
      timeOut: 2000,
    }),
  ],
};
