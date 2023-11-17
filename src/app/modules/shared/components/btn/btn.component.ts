import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COLORS, Colors } from '@models/colors.model';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class ButtonComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: Colors = 'primary';
  faSpinner = faSpinner;

  mapColors = COLORS;

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }

}
