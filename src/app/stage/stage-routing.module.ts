import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { StageComponent } from './stage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';

const routes: Routes = [
  {path: 'stage', component: StageComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'albums', component: AlbumsComponent},
    {path: 'diagnostics', component: DiagnosticsComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StageRoutingModule { }
