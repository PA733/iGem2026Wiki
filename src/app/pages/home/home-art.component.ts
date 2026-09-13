import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Original vector artwork; it stays crisp at every Material card breakpoint. */
@Component({
  selector: 'app-home-art',
  standalone: true,
  templateUrl: './home-art.component.html',
  host: { class: 'home-art', '[class]': '"home-art art-" + kind' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeArtComponent {
  @Input() kind = '';
}
