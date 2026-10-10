import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SKILLS } from '../../../../core/data/portfolio.data';
import { Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective, RouterLink, TranslatePipe, Icon],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly skills = SKILLS;
}
