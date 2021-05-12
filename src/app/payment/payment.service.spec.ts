/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentService } from './payment.service';
import { CreditCardPaymentFacade } from './store/facade';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from './order.service';
import {  HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

describe('OrderService', () => {
  let httpMock : HttpTestingController;
  let orderService: OrderService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      OrderService
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    orderService = TestBed.get(OrderService);
  })

 

  it('should make a get request to create an order', () => {
    const mockOrder = {
      data: [
        {_id: 'adsfsdf',
        name: 'Jennifer',
        address: '123 main',
        phone: '555-555-5555',
        status: 'old',
        items: [
          {
            name: 'nummy fries',
            price: 2.56
          }
        ]}
      ]
    };

    const createdOrder = {
      _id: 'adsfsdf',
      name: 'Jennifer',
      address: '123 main',
      phone: '555-555-5555',
      status: 'new',
      items: [
        {
          name: 'nummy fries',
          price: 2.56
        }
      ]}

    orderService.createOrder(mockOrder.data[0]).subscribe((orders) => {
      expect(orders).toEqual(mockOrder);
    });

    let url = 'http://localhost:7070/orders';
    httpMock.expectOne((request: HttpRequest<any>) => {
      console.log(request.body);
      return request.method == 'POST'
        && request.url == url
        && JSON.stringify(request.body) == JSON.stringify(createdOrder);
    }).flush(mockOrder);

    httpMock.verify();
  });

  });

describe('Service: Payment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],

      providers: [PaymentService, CreditCardPaymentFacade]
    });
  });

  it('should create service', inject(
    [PaymentService],
    (service: PaymentService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('Should return success on payWithCard', () => {
    const service: PaymentService = TestBed.inject(PaymentService);
    const mockPaymentData = {
      creditCardNumber: '1223232323232342',
      cardHolder: 'Test',
      expirationDate: '2021-01-16T22:52:56.295Z',
      securityCode: '123',
      amount: 2345
    };
    const mockResponse = {
      status: 'success',
      message: 'Payment processed successfully!'
    };

    service
      .makePayment(mockPaymentData)
      .pipe(takeUntil(new Subject()))
      .subscribe(response => {
        expect(response.body).toEqual(mockResponse);
      });
  });
});
