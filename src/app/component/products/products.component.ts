import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { Customer } from 'src/app/interface/customer';
import { Product } from 'src/app/interface/product';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // profileState shows all the data in the HTML
  productsState$: Observable<State<CustomHttpResponse<Page<Product> & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Product> & User>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(true);
  showLogs$ = this.showLogsSubject.asObservable();
  readonly DataState = DataState;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.productsState$ = this.productService.products$().pipe(
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

  // searchCustomers(searchForm: NgForm): void {
  //   this.currentPageSubject.next(0);
  //   this.productsState$ = this.productService.searchCustomers$(searchForm.value.name).pipe(
  //     map(response => {
  //       console.log(response);
  //       this.dataSubject.next(response);
  //       return {
  //         dataState: DataState.LOADED,
  //         appData: response,
  //       };
  //     }),
  //     startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
  //     catchError((error: string) => {
  //       return of({
  //         dataState: DataState.ERROR,
  //         error,
  //       });
  //     }),
  //   );
  // }

  // goToPage(pageNumber?: number, name?: string): void {
  //   this.productsState$ = this.productService.searchCustomers$(name, pageNumber).pipe(
  //     map(response => {
  //       console.log(response);
  //       this.dataSubject.next(response);
  //       this.currentPageSubject.next(pageNumber);
  //       return {
  //         dataState: DataState.LOADED,
  //         appData: response,
  //       };
  //     }),
  //     startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
  //     catchError((error: string) => {
  //       return of({
  //         dataState: DataState.LOADED,
  //         error,
  //         appData: this.dataSubject.value,
  //       });
  //     }),
  //   );
  // }

  // goToNextOrPreviousPage(direction?: string, name?: string): void {
  //   this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1, name);
  // }

  selectCustomer(customer: Customer): void {
    this.router.navigate([`/customers/${customer.id}`]);
  }
}
