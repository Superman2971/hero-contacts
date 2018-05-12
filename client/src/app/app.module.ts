import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
// Services
import { HeroFormService } from './hero-form/hero-form.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HeroFormComponent
  ],
  providers: [
    HeroFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
