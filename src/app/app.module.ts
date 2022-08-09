import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TooltipDirectiveModule } from './tooltip/tooltip-directive.module';

@NgModule({
  imports: [BrowserModule, FormsModule, TooltipDirectiveModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
