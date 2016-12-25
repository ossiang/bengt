import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms'
import { HttpModule }               from '@angular/http'

import { AppComponent }             from './components/app.component';
import { PlayersComponent }         from './components/players.component';
import { StatisticsComponent }      from './components/statistics.component';
import { PlayerDetailComponent }    from './components/player.detail.component';
import { NavbarComponent }          from './components/navbar.component';
import { PageHeaderComponent }      from './components/page.header.component';
import { TrainingSectionComponent } from './components/training.section.component';
import { PlayerList }               from './components/player.list.component'
import { CommentList }              from './components/comment.list.component'
import { Progressbar }              from './components/progressbar.component'

import { DatePipe }                 from './date.pipe'

import { ApiService }               from './api.service'

import { routing }                  from './app.routing'

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
    PlayersComponent,
    PlayerDetailComponent,
    NavbarComponent,
    PageHeaderComponent,
    PlayerList,
    TrainingSectionComponent,
    CommentList,
    Progressbar,
    DatePipe
  ],
  providers: [
    ApiService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
