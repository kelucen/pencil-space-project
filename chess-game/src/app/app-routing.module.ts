import { IframepageComponent } from './iframepage/iframepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
{ path: 'iframepage', component: IframepageComponent },
  {path: 'main', component: MainpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
