import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SanitizeHtmlPipe } from '@ui/pipes';

@Component({
  selector: 'app-chip-item',
  standalone: true,
  imports: [SanitizeHtmlPipe],
  templateUrl: './chip-item.component.html',
  styleUrl: './chip-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipItemComponent {
  @Input({ required: true }) public text!: string;
}
