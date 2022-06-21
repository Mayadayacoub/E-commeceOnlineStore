import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Products } from 'src/app/Model/Products';
import { CartService } from 'src/app/services/cart.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public allItems: Products[] = [];
  public options: number[] = [1, 2, 3, 4, 5, 6];
  public allQuantities = 0;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getallData().subscribe((data) => {
      this.allItems = data;
      console.log(data, 'data');
      this.allItems.forEach((a: Products) => {
        Object.assign(a, { quantity: 1 });
      });
    });
  }

  addingProductsToCart(item: Products) {
    this.cartService.addToCart(item);
  }
  // getProduct(item: Products) {
  //   this.dataList.filter((e) => e.id == item.id);
  //   this.dataList = this.allItems;
  //   console.log(this.allItems);
  // }
  // onSelect(item: any) {
  //   this.router.navigate(['/productList', item.id]);
  // }
}
