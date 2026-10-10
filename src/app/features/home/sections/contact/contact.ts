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
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type SendStatus = 'idle' | 'sending' | 'success' | 'error';
type TextField = 'name' | 'email' | 'message';
type ContactField = TextField | 'privacy';

const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿß]{2,}(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿß]+)*$/;
const EMAIL_PATTERN =
  /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const MESSAGE_MIN_LENGTH = 5;
const FEEDBACK_DURATION_MS = 5000;

function notBlank(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.trim() ? null : { required: true };
}

function trimmedPattern(pattern: RegExp) {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value.trim();
    if (!value) return null;
    return pattern.test(value) && !value.includes('..') ? null : { pattern: true };
  };
}

function trimmedMinLength(length: number) {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value.trim();
    if (!value) return null;
    return value.length >= length ? null : { minlength: true };
  };
}

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly contactService = inject(ContactService);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [notBlank, trimmedPattern(NAME_PATTERN)]],
    email: ['', [notBlank, trimmedPattern(EMAIL_PATTERN)]],
    message: ['', [notBlank, trimmedMinLength(MESSAGE_MIN_LENGTH)]],
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

  protected revealErrors(): void {
    if (this.form.valid) return;
    this.form.markAllAsTouched();
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
