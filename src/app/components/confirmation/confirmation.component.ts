import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;
  data: any = {};
  routeState: any;
  constructor(private router: Router) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {}
}
