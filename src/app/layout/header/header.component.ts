import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Products } from 'src/app/Model/Products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  constructor(private cartService: CartService) {}
  @Input('matBadgeColor')
  color: ThemePalette;
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((item: any) => {
      // console.log(item);
      this.totalItem = item.length;
    });
  }
}
