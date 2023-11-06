import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BtnComponent } from './components/btn/btn.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkTableModule} from '@angular/cdk/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { BoardComponent } from './pages/board/board.component';
import { DialogModule } from '@angular/cdk/dialog';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TablesComponent } from './pages/tables/tables.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BtnComponent,
    BoardsComponent,
    NavbarComponent,
    BoardComponent,
    TodoDialogComponent,
    ScrollComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    CdkAccordionModule,
    FontAwesomeModule,
    DragDropModule,
    DialogModule,
    HttpClientModule,
    ScrollingModule,
    CdkTableModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
