import { Component } from '@angular/core';
import { translatedList } from '../../core/i18n/translated-list';
import { LegalSection } from '../../core/models/portfolio.models';
import { LegalContent } from './legal-content';

@Component({
  selector: 'app-legal-notice-page',
  imports: [LegalContent],
  template: `
    <app-legal-content titleKey="legalNotice.title" dateKey="legalNotice.date" [sections]="sections()" />
  `,
})
export class LegalNoticePage {
  protected readonly sections = translatedList<LegalSection>('legalNotice.sections');
}
