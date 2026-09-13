import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import {
  APPLY_CARDS,
  COMPONENT_CARDS,
  EXPRESSIVE_INTRO_CARDS,
  IO_CARDS,
  LATEST_CARDS,
  NEXT_CARDS,
} from './home.data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements AfterViewInit, OnChanges {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @Input() isSearchPage = false;
  @Input() isArticlePage = false;
  @Input() animationsPaused = false;

  @ViewChild('heroVideo') private heroVideo?: ElementRef<HTMLVideoElement>;

  readonly ioCards = IO_CARDS;
  readonly expressiveIntroCards = EXPRESSIVE_INTRO_CARDS;
  readonly componentCards = COMPONENT_CARDS;
  readonly applyCards = APPLY_CARDS;
  readonly latestCards = LATEST_CARDS;
  readonly nextCards = NEXT_CARDS;

  isVideoPaused = false;

  ngOnChanges(): void {
    // Set the accessible control label before the first render, including
    // when the shell restores a paused preference or a different route.
    this.restartVideo();
  }

  ngAfterViewInit(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;

    // Explicitly starting the muted montage keeps autoplay reliable in
    // headless and mobile browsers.
    video.muted = true;
    video.defaultMuted = true;
    this.restartVideo();
  }

  /** Reapply the route and animation policy, including browser navigation. */
  restartVideo(): void {
    this.isVideoPaused = this.isSearchPage || this.isArticlePage || this.animationsPaused;
    const video = this.heroVideo?.nativeElement;
    if (!video) return;

    if (this.isVideoPaused) {
      video.pause();
    } else {
      void video.play().catch(() => {
        this.isVideoPaused = true;
        this.changeDetectorRef.markForCheck();
      });
    }
    this.changeDetectorRef.markForCheck();
  }

  toggleVideo(): void {
    const video = this.heroVideo?.nativeElement;
    if (!video) return;
    if (video.paused) {
      this.isVideoPaused = false;
      void video.play().catch(() => {
        this.isVideoPaused = true;
        this.changeDetectorRef.markForCheck();
      });
    } else {
      video.pause();
      this.isVideoPaused = true;
    }
  }

  /** Links to other sites open in a new tab, matching the source navigation. */
  isExternalLink(href: string): boolean {
    return /^https?:\/\/(?!m3\.material\.io(?:\/|$))/i.test(href);
  }
}
