import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/btn/btn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollComponent } from './components/scroll/scroll.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    ButtonComponent,
    ScrollComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CdkVirtualScrollViewport
  ],
  exports: [ButtonComponent]
})
export class SharedModule { }
