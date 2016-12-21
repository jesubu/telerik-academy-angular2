import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormComponent } from './form.component';
import { RequiredValidator } from './form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RequiredValidator
  ],
  imports: [
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,

    HttpModule,

    ButtonsModule,
    GridModule,
    DropDownsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
