import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml',
  standalone: true,
})
export class SanitizeHtmlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  public transform(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
