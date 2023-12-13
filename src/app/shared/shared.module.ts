import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExtractArrayValue } from 'src/pipes/extractvalue.pipe';

@NgModule({
  declarations: [ExtractArrayValue],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [CommonModule, FormsModule, RouterModule, ExtractArrayValue],
})
export class SharedModule {}
