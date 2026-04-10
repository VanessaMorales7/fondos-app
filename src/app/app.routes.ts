import { Routes } from '@angular/router';
import { Fondos } from './pages/fondos/fondos';
import { Historial } from './pages/historial/historial';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'fondos',
        pathMatch: 'full'
    },
    {
        path: 'fondos',
        component: Fondos
    },
    {
        path: 'historial',
        component: Historial
    }
];
