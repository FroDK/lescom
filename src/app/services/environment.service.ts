import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  get production(): boolean {
    return environment.production;
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  get port(): number {
    return environment.port;
  }

  get hmr(): boolean {
    return environment.hmr;
  }

  get isDevelopment(): boolean {
    return !environment.production;
  }
}
