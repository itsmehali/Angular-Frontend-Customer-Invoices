import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page, ProductState } from 'src/app/interface/appstates';
import { Product } from 'src/app/interface/product';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css'],
})
export class NewproductComponent implements OnInit {
  newProductState$: Observable<State<CustomHttpResponse<Page<Product> & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Product> & User>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = DataState;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.newProductState$ = this.productService.products$().pipe(
      map(response => {
        console.log(response);
        this.dataSubject.next(response);
        return {
          dataState: DataState.LOADED,
          appData: response,
        };
      }),
      startWith({ dataState: DataState.LOADING }),
      catchError((error: string) => {
        return of({
          dataState: DataState.ERROR,
          error,
        });
      }),
    );
  }

  createProduct(newCustomerForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.newProductState$ = this.productService.newProduct$(newCustomerForm.value).pipe(
      map(response => {
        console.log(response);
        this.isLoadingSubject.next(false);
        return {
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
        };
      }),
      startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.isLoadingSubject.next(false);
        return of({
          dataState: DataState.ERROR,
          error,
        });
      }),
    );
  }
}
