import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import {ChartsModule} from 'ng2-charts';
import { ChartComponent } from './page/chart/chart.component';
import {ChartModule} from 'angular-highcharts';
import { FirstProjectComponent } from './page/first-project/first-project.component';
import { BackPackComponent } from './page/back-pack/back-pack.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    FirstProjectComponent,
    BackPackComponent
  ],
    imports: [
        BrowserModule,
        ChartsModule,
        AppRoutingModule,
        ChartModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
