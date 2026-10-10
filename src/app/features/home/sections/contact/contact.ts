import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { ContactService } from '../../../../core/services/contact.service';

type SendStatus = 'idle' | 'sending' | 'success' | 'error';
type TextField = 'name' | 'email' | 'message';
type ContactField = TextField | 'privacy';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FEEDBACK_DURATION_MS = 5000;

function notBlank(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.trim() ? null : { required: true };
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly contactService = inject(ContactService);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', notBlank],
    email: ['', [notBlank, Validators.pattern(EMAIL_PATTERN)]],
    message: ['', notBlank],
    privacy: [false, Validators.requiredTrue],
  });

  protected readonly status = signal<SendStatus>('idle');

  protected showError(field: ContactField): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  protected isMissing(field: TextField): boolean {
    const control = this.form.controls[field];
    return control.touched && control.value.trim() === '';
  }

  protected showHint(field: TextField): boolean {
    return this.showError(field) && !this.isMissing(field);
  }

  protected submit(): void {
    if (this.form.invalid || this.status() === 'sending') return;
    const { name, email, message } = this.form.getRawValue();
    this.status.set('sending');
    this.contactService
      .send({ name: name.trim(), email: email.trim(), message: message.trim() })
      .pipe(finalize(() => setTimeout(() => this.status.set('idle'), FEEDBACK_DURATION_MS)))
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }
}
