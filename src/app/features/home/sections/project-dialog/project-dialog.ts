import {
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Project } from '../../../../core/models/portfolio.models';
import { Icon } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-project-dialog',
  imports: [TranslatePipe, DecimalPipe, Icon],
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.scss',
})
export class ProjectDialog implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');

  readonly project = input.required<Project>();
  readonly number = input.required<number>();
  readonly closed = output<void>();
  readonly nextRequested = output<void>();

  ngOnInit(): void {
    this.document.body.classList.add('no-scroll');
    queueMicrotask(() => this.closeButton().nativeElement.focus());
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('no-scroll');
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.closed.emit();
  }
}
