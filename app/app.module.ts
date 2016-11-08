import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms'
import { HttpModule, JsonpModule }  from '@angular/http'

import { AppComponent }             from './components/app.component';
import { StatisticsComponent }      from './components/statistics.component';
import { PlayerDetailComponent }    from './components/player.detail.component';
import { NavbarComponent }          from './components/navbar.component';
import { PageHeaderComponent }      from './components/page.header.component';
import { TrainingSectionComponent } from './components/training.section.component';
import { PlayerList }               from './components/player.list.component'

import { ApiService }               from './api.service'

import { routing }                  from './app.routing'

import './rxjs.extensions'

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    routing
  ],
  declarations: [ 
    AppComponent, 
    StatisticsComponent, 
    PlayerDetailComponent, 
    NavbarComponent,
    PageHeaderComponent,
    PlayerList,
    StatisticsComponent,
    TrainingSectionComponent
  ],
  providers: [ 
    ApiService
  ],
  bootstrap: [ 
    AppComponent 
  ],
})
export class AppModule { }