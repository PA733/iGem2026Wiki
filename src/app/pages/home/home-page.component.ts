import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { HomeArtComponent } from './home-art.component';
import { APPLY_CARDS, COMPONENT_CARDS, EXPRESSIVE_INTRO_CARDS, IO_CARDS, NEXT_CARDS } from './home.data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeArtComponent],
  templateUrl: './home-page.component.html',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnChanges {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @Input() isSearchPage = false;
  @Input() isArticlePage = false;
  @Input() animationsPaused = false;

  readonly ioCards = IO_CARDS;
  readonly expressiveIntroCards = EXPRESSIVE_INTRO_CARDS;
  readonly componentCards = COMPONENT_CARDS;
  readonly applyCards = APPLY_CARDS;
  readonly nextCards = NEXT_CARDS;

  isVideoPaused = false;
  private locallyPaused = false;

  ngOnChanges(): void {
    this.restartVideo();
  }

  /** Preserve the shell's animation-policy interface for the SVG scene. */
  restartVideo(): void {
    this.isVideoPaused = this.locallyPaused || this.isSearchPage || this.isArticlePage || this.animationsPaused;
    this.changeDetectorRef.markForCheck();
  }

  toggleVideo(): void {
    if (this.animationsPaused) return;
    this.locallyPaused = !this.locallyPaused;
    this.restartVideo();
  }
}
