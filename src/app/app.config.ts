import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from '../shared/interceptors/api-interceptor';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { searchReducer } from '../features/search/store/search-view.reducer';
import { provideEffects } from '@ngrx/effects';
import { SearchEffects } from '../features/search/store/search.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideStore({ search: searchReducer }),
    provideEffects([SearchEffects])
],
};
