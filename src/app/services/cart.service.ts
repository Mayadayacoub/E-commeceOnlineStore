import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { Products } from '../Model/Products';
import data from '../../assets/data.json';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  public url: string = 'assets/data.json';
  public cartList: Products[] = [];
  public productGroup = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}
  getallData(): Observable<Products[]> {
    return this.http
      .get<Products[]>(this.url)
      .pipe(catchError(this.errorhandler));
  }

  errorhandler(error: HttpErrorResponse) {
    return throwError(() => new Error('test'));
  }

  getProducts() {
    return this.productGroup.asObservable();
  }

  addToCart(product: Products) {
    let addedToCartAlready: boolean = false;
    let productsInCart: any = undefined;
    if (this.cartList.length > 0) {
      productsInCart = this.cartList.find(
        (cartItem) => cartItem.id === product.id
      );
      addedToCartAlready = productsInCart != undefined;
    }
    if (addedToCartAlready) {
      const itemIndex: any = this.cartList.findIndex(
        (item) => item.id == product.id
      );

      this.cartList[itemIndex].quantity += 1;
      alert('Item Added Again To Cart');
    } else {
      this.cartList.push(product);
      alert('Item Added  To Cart');
    }

    this.productGroup.next(this.cartList);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartList.map((product: any) => {
      const allQuantitiesWithPrice = product.quantity * product.price;
      totalPrice += allQuantitiesWithPrice;
    });
    return totalPrice;
  }

  onDelete(item: Products) {
    this.cartList.map((product: any, idx: any) => {
      if (item.id === product.id) {
        this.cartList.splice(idx, 1);
      }
    });
    this.productGroup.next(this.cartList);
  }
  deleteAllCart() {
    this.cartList = [];
    this.productGroup.next(this.cartList);
  }
}
