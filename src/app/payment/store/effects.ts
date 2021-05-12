import { get } from 'lodash';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  mergeMap,
  filter,
  withLatestFrom
} from 'rxjs/operators';
import { routerNavigatedAction } from '@ngrx/router-store';

// import { CreditCardPaymentAdapter } from 'src/app/core/adapter';
import { PaymentService } from '../payment.service';
import {
  load,
  loadSuccess,
  payWithCard,
  payWithCardError,
  payWithCardSuccess
} from './actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class CreditCardPaymentStoreEffects {
  constructor(
    private dataService: PaymentService,
    private toasterService: ToastrService,
    private router: Router,
    private actions$: Actions
  ) {}

  proceedPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(payWithCard),
      concatMap(action => {
        return of(action).pipe(withLatestFrom());
      }),
      mergeMap(([action]) => {
        const { paymentData } = action;
        let returnedAction;
        return this.dataService.makePayment(paymentData).pipe(
          map(response => {
            if (response.body.status === 'success') {
              this.toasterService.success(
                'Your payment was successful',
                'SUCCESSFUL'
              );
              this.router.navigate(['']);
              returnedAction = payWithCardSuccess({
                creditCardData: paymentData
              });
            } else {
              this.toasterService.error(
                'Your payment Failed please try again later',
                'FAILURE'
              );
              returnedAction = payWithCardError({
                error: 'Something went wrong please try again'
              });
            }
            return returnedAction;
          }),
          catchError(error => of(payWithCardError({ error })))
        );
      })
    )
  );
}
