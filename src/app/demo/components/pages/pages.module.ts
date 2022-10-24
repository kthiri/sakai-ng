import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { BankAccountComponent } from './bank-account/bank-account.component';

@NgModule({
    declarations: [
    
  
    BankAccountComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
