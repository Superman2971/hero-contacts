// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// 3rd Party Modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
// Components
import { AppComponent } from './app.component';
import { HeroNavbarComponent } from './hero-navbar/hero-navbar.component';
import { HeroOverviewComponent } from './hero-overview/hero-overview.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroInputComponent } from './hero-form/hero-input/hero-input.component';
import { ConfirmModalComponent } from './hero-list/confirm-modal/confirm-modal.component';
// Services
import { NavigationService } from './hero-navbar/navigation.service';
import { HeroListService } from './hero-list/hero-list.service';
import { HeroFormService } from './hero-form/hero-form.service';

// For Fusion Charts
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FusionChartsModule
  ],
  declarations: [
    AppComponent,
    HeroNavbarComponent,
    HeroOverviewComponent,
    HeroListComponent,
    HeroFormComponent,
    HeroInputComponent,
    ConfirmModalComponent
  ],
  providers: [
    NavigationService,
    HeroListService,
    HeroFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
