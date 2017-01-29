import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { PlayersComponent }         from './components/players.component';
import { StatisticsComponent }      from './components/statistics.component';
import { TrainingSectionComponent } from './components/training.section.component';
import { PlayerDetailComponent }    from './components/player.detail.component';
import { AdminComponent }           from './components/admin.component';

const appRoutes: Routes = 
[
    {
        path: 'players',
        component: PlayersComponent
    },
    {
        path: 'players/:id',
        component: PlayersComponent
    },
    {
        path: 'statistics',
        component: StatisticsComponent
    },
    {
        path: 'training',
        component: TrainingSectionComponent
    },
    {
        path: '',
        redirectTo: '/training',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: PlayerDetailComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);