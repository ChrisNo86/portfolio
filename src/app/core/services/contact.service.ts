import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SITE_CONFIG } from '../config/site.config';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(message: ContactMessage): Observable<unknown> {
    return this.http.post(SITE_CONFIG.mailEndpoint, message, { responseType: 'text' });
  }
}
