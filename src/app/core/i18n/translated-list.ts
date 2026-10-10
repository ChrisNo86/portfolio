import { Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

export function translatedList<T>(key: string): Signal<T[]> {
  const translate = inject(TranslateService);
  return toSignal(
    translate.stream(key).pipe(map((value) => (Array.isArray(value) ? (value as T[]) : []))),
    { initialValue: [] },
  );
}
