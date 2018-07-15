import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StageComponent } from './stage/stage.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stage', component: StageComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
