import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './component/products/products.component';
import { NewproductComponent } from './component/newproduct/newproduct.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './component/auth/auth.module';
import { CustomerModule } from './component/customer/customer.module';
import { HomeModule } from './component/home/home.module';
import { InvoiceModule } from './component/invoice/invoice.module';

@NgModule({
  declarations: [AppComponent, ProductsComponent, NewproductComponent],
  imports: [BrowserModule, HttpClientModule, CoreModule, AuthModule, CustomerModule, InvoiceModule, HomeModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
