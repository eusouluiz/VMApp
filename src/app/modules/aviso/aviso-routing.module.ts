import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HubPage } from './pages/hub/hub.page';

const routes: Routes = [{path: '', component: HubPage}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisoRoutingModule { 
  static components = [HubPage]
}
