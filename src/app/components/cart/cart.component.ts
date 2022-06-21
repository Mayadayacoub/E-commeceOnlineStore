import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Products } from 'src/app/Model/Products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public allItems: Products[] = [];
  public wholeTotal!: any;
  public total!: number;
  public options: number[] = [1, 2, 3, 4, 5, 6];
  public address: string = '';
  public userName: string = '';
  public creditCardNumber: string = '';
  public shipping: number = 30;
  quantityIsSelected = true;
  public test: any = '';
  value2: string = '';
  constructor(private cartsService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartsService.getProducts().subscribe((items: any) => {
      this.allItems = items;
    });
    this.wholeTotal = this.cartsService.getTotalPrice();
  }

  getPayment() {
    const quantity = this.allItems.map((u) => u.quantity);
    this.quantityIsSelected = false;
    if (quantity) {
      alert(`You have added ${quantity.join(' & ')} items`);
      this.wholeTotal;
    }
    this.wholeTotal = this.cartsService.getTotalPrice();
  }

  deleteProduct(item: Products) {
    this.cartsService.onDelete(item);
    alert('Item Has Deleted');
  }
  emptyCart() {
    this.cartsService.deleteAllCart();
    alert('You Have Deleted All Products');
  }
  onSubmit() {
    alert(
      ` Your Name is: ${this.userName} ,
       Your Address Is : ${this.address}
      And Your Credit Card Number is : ${this.creditCardNumber}`
    );
    this.router.navigate(['/confirmation'], {
      state: {
        userName: this.userName,
        address: this.address,
        creditCardNumber: this.creditCardNumber,
        wholeTotal: this.wholeTotal,
        shipping: this.shipping,
      },
    });
  }
}
