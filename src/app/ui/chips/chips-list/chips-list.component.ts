import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChipItemComponent } from '@ui/chips/chip-item';

@Component({
  selector: 'app-chips-list',
  standalone: true,
  imports: [ChipItemComponent],
  templateUrl: './chips-list.component.html',
  styleUrl: './chips-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsListComponent {
  @Input({ required: true }) public data: string[] = [];
}
