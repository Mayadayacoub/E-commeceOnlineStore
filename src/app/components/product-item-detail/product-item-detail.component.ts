import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/Model/Products';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import data from '../../../assets/data.json';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  public selectedItem: Products | undefined;
  public dataList: Products[] = data;
  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let params: any = this.activatedRoute.snapshot.params;
    this.selectedItem = this.dataList.find((e) => e.id == params.id);
  }
}
