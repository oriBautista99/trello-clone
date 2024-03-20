import { Component, Input } from '@angular/core';
import { Colors } from '@models/colors.model';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss']
})
export class SocialButtonComponent {

  @Input() iconSocial: 'google' | 'microsoft' | 'apple' | 'slack' = 'google';
  @Input() colors: Colors = 'light';


}
