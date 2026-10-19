import { SiteUrlPipe } from '../../site-url.pipe';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SiteUrlPipe],
  templateUrl: './footer.component.html',
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Output() readonly homeRequested = new EventEmitter<Event>();
}
