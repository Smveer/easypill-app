import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugSelectionPageRoutingModule } from './drug-selection-routing.module';

import { DrugSelectionPage } from './drug-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugSelectionPageRoutingModule
  ],
  declarations: [DrugSelectionPage]
})
export class DrugSelectionPageModule {}
