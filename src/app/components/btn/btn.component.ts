import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class BtnComponent {

  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() bgColor: 'primary' | 'success' | 'danger' | 'light' = 'primary';

  mapColors = {
    success: {
      'bg-success-600':true,
      'hover:bg-success-500':true,
      'focus:ring-success-300':true,
      'text-white':true
    },
    primary: {
      'bg-primary-600': true,
      'hover:bg-primary-500': true,
      'focus:ring-primary-300': true,
      'text-white':true
    },
    danger: {
      'bg-red-600': true,
      'hover:bg-red-500': true,
      'focus:ring-red-300': true,
      'text-white':true
    },
    light: {
      'bg-gray-200':true,
      'hover:bg-gray-500':true,
      'focus:ring-gray-50':true,
      'text-gray-700': true
    }
  }

  get colors(){
    const colorsS = this.mapColors[this.bgColor];
    if(colorsS){
      return colorsS;
    }
    return {};
  }

}
