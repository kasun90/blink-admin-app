import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { StageComponent } from './stage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'stage', component: StageComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'albums', component: AlbumsComponent},
    {path: 'diagnostics', component: DiagnosticsComponent},
    {path: 'messages', component: MessagesComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StageRoutingModule { }
