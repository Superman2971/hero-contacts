import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { HeroNavbarComponent } from './hero-navbar/hero-navbar.component';
import { HeroOverviewComponent } from './hero-overview/hero-overview.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
// Services
import { NavigationService } from './hero-navbar/navigation.service';
import { HeroListService } from './hero-list/hero-list.service';
import { HeroFormService } from './hero-form/hero-form.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HeroNavbarComponent,
    HeroOverviewComponent,
    HeroListComponent,
    HeroFormComponent
  ],
  providers: [
    NavigationService,
    HeroListService,
    HeroFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
