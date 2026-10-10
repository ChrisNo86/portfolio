import { Component } from '@angular/core';
import { translatedList } from '../../core/i18n/translated-list';
import { LegalSection } from '../../core/models/portfolio.models';
import { LegalContent } from './legal-content';

@Component({
  selector: 'app-privacy-policy-page',
  imports: [LegalContent],
  template: `
    <app-legal-content titleKey="privacy.title" dateKey="privacy.date" [sections]="sections()" />
  `,
})
export class PrivacyPolicyPage {
  protected readonly sections = translatedList<LegalSection>('privacy.sections');
}
