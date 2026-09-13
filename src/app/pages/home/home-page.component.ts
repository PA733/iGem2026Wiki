import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animationsPaused'] || changes['isSearchPage'] || changes['isArticlePage']) {
      this.restartVideo();
    }
  }

  /** A global playback command also updates media that was paused locally. */
  restartVideo(): void {
    this.isVideoPaused = this.isSearchPage || this.isArticlePage || this.animationsPaused;
    this.changeDetectorRef.markForCheck();
  }

  toggleVideo(): void {
    // Like the reference video's control, this can override the global setting
    // for this scene until the next global playback command.
    this.isVideoPaused = !this.isVideoPaused;
    this.changeDetectorRef.markForCheck();
  }
}
