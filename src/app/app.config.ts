import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),     // Provide routing
    provideHttpClient(),          // Provide HttpClient
    provideCharts(withDefaultRegisterables()) // Provide Charts
  ],
};
