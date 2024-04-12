// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { FolderBrowserComponent } from './folder-browser/folder-browser.component';
import { FileBrowserService } from './file-browser.service'

@NgModule({
  declarations: [
    AppComponent,
    FolderBrowserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FileBrowserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
