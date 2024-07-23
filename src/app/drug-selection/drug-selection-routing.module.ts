import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugSelectionPage } from './drug-selection.page';

const routes: Routes = [
  {
    path: '',
    component: DrugSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugSelectionPageRoutingModule {}
