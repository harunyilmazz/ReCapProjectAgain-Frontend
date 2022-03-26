import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customers';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  constructor() {}

  ngOnInit(): void {}
}
