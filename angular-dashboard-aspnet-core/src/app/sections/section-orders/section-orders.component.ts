import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { MOCK_ORDERS } from '../../core/shared/mock.orders';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private _orderService: OrderService) { }

  // public orders: Order[] = MOCK_ORDERS;
  public orders: Order[];
  public total: number = 0;
  public page: number = 1;
  public limit: number = 10;
  public loading: boolean = false;

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(): void {
    this._orderService.getOrders(this.page, this.limit)
      .subscribe(res => {
        // console.log('Result from getOrders: ', res);
        this.orders = res['page']['data'];
        this.total = res['page'].total;
        this.loading = false;
      });
  }
  
  public goToPrevious(): void {
    // console.log('Previous Button Clicked!');
    this.page--;
    this.getOrders();
  }

  public goToNext(): void {
    // console.log('Next Button Clicked!');
    this.page++;
    this.getOrders();
  }

  public goToPage(number: number): void {
    this.page = number;
    this.getOrders();
  }

}
