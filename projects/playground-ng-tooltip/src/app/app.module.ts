import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { TooltipModule } from '../../../independer/ng-tooltip/src/lib/tooltip.module';
import { HomeComponent } from './home.component';
import { HighlightComponent } from './highlight/highlight.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgTooltipDialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HighlightComponent,
    NgTooltipDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MatDialogModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NgTooltipDialogComponent]
})
export class AppModule { }
