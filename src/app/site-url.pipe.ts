import { Pipe, PipeTransform } from '@angular/core';
import { siteUrl } from './site-path';

@Pipe({ name: 'siteUrl', standalone: true })
export class SiteUrlPipe implements PipeTransform {
  transform(path: string): string { return siteUrl(path); }
}
