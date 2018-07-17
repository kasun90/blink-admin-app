import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StageComponent } from './stage/stage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stage', component: StageComponent , children: [
    {path: 'dashboard', component: DashboardComponent, outlet: 'stage_desc'},
    {path: 'albums', component: AlbumsComponent, outlet: 'stage_desc'},
    {path: 'diagnostics', component: DiagnosticsComponent, outlet: 'stage_desc'}
  ]}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
