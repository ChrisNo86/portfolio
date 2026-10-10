import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { LegalSection } from '../../core/models/portfolio.models';

/** Placeholders inside the legal texts that are filled from SITE_CONFIG. */
const PLACEHOLDERS: Record<string, string> = {
  '{name}': SITE_CONFIG.ownerName,
  '{street}': SITE_CONFIG.address.street,
  '{city}': SITE_CONFIG.address.city,
  '{country}': SITE_CONFIG.address.country,
  '{email}': SITE_CONFIG.email,
};

function fillPlaceholders(text: string): string {
  return Object.entries(PLACEHOLDERS).reduce(
    (result, [token, value]) => result.replaceAll(token, value),
    text,
  );
}

@Component({
  selector: 'app-legal-content',
  imports: [TranslatePipe],
  templateUrl: './legal-content.html',
  styleUrl: './legal-content.scss',
})
export class LegalContent {
  readonly titleKey = input.required<string>();
  readonly dateKey = input.required<string>();
  readonly sections = input.required<LegalSection[]>();

  protected readonly filledSections = computed(() =>
    this.sections().map((section) => ({
      title: section.title,
      paragraphs: section.paragraphs.map(fillPlaceholders),
    })),
  );
}
