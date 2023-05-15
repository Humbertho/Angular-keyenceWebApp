import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoute } from './shared/constants/routes';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
