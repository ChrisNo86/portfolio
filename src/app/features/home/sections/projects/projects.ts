import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { PROJECTS } from '../../../../core/data/portfolio.data';
import { Icon } from '../../../../shared/components/icon/icon';
import { ProjectDialog } from '../project-dialog/project-dialog';

/** Vertical offset of the hover preview per list row (from the prototype). */
const PREVIEW_START_OFFSET = -10;
const PREVIEW_STEP = 77;

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, ProjectDialog, Icon],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projects = PROJECTS;
  protected readonly repositoriesUrl = `${SITE_CONFIG.githubUrl}?tab=repositories`;
  protected readonly openIndex = signal<number | null>(null);
  protected readonly hoveredIndex = signal<number | null>(null);

  protected readonly selected = computed(() => {
    const index = this.openIndex();
    return index === null ? null : { project: this.projects[index], number: index + 1 };
  });

  /** Keeps the last preview visible while it fades out. */
  private readonly lastHovered = signal(0);
  protected readonly preview = computed(() => {
    const index = this.lastHovered();
    return {
      project: this.projects[index],
      top: PREVIEW_START_OFFSET + index * PREVIEW_STEP,
    };
  });

  hover(index: number | null): void {
    this.hoveredIndex.set(index);
    if (index !== null) this.lastHovered.set(index);
  }

  open(index: number): void {
    this.openIndex.set(index);
  }

  close(): void {
    this.openIndex.set(null);
  }

  next(): void {
    this.openIndex.update((index) => ((index ?? 0) + 1) % this.projects.length);
  }
}
