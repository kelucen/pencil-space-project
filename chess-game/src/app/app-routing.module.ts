import { IframePageComponent } from './iframepage/iframepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  {path: 'iframepage', component: IframePageComponent },
  {path: 'mainpage', component: MainPageComponent },

  {path: '', redirectTo: '/mainpage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
