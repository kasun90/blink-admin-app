import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { ArticlesComponent } from './articles/articles.component';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { StageComponent } from './stage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './auth.guard';
import { PresetsComponent } from './presets/presets.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: 'stage', component: StageComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'albums', component: AlbumsComponent},
    {path: 'diagnostics', component: DiagnosticsComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'presets', component: PresetsComponent},
    {path: 'account', component: AccountComponent},
    {path: 'articles', component: ArticlesComponent},
    {path: 'articles/edit/:articleKey', component: EditArticleComponent},
    {path: 'settings', component: SettingsComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StageRoutingModule { }
