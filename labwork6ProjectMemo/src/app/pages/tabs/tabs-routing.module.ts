import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'to-do',
        loadChildren: () =>
          import('../to-do/to-do.module').then((m) => m.ToDoPageModule),
      },
      {
        path: 'weather',
        loadChildren: () =>
          import('../weather/weather.module').then((m) => m.WeatherPageModule),
      },
      {
        path: '',
        redirectTo: 'to-do',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
