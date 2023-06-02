import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule
  ]
})
export class MaterialModule { }
