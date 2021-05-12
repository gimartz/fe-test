import { createAction, props } from '@ngrx/store';
import { Blockchain } from '../../final/final.model';

export enum CreditCardPaymentActionType {
  LOAD_CREDIT_CARD = '[CreditCardPayment] Load',
  LOAD_CREDIT_CARD_SUCCESS = '[CreditCardPayment] Load Success',
  REFRESH = '[CreditCardPayment] Refresh',
  PAY_WITH_CARD = '[CreditCardPayment] Pay',
  PAY_WITH_CARD_SUCCESS = '[CreditCardPayment] Payment Success',
  PAY_WITH_CARD_ERROR = '[CreditCardPayment] Submit Success'
}

export const load = createAction(CreditCardPaymentActionType.LOAD_CREDIT_CARD);
export const changeValidationStatus = createAction(
  '[Personal Page] Change Validation Status',
  props<{ isLoading: boolean }>()
);
export const loadSuccess = createAction(
  CreditCardPaymentActionType.LOAD_CREDIT_CARD_SUCCESS,
  props<{ creditCardData: Blockchain }>()
);

export const payWithCard = createAction(
  CreditCardPaymentActionType.PAY_WITH_CARD,
  props<{ paymentData: Blockchain }>()
);

export const payWithCardSuccess = createAction(
  CreditCardPaymentActionType.PAY_WITH_CARD_SUCCESS,
  props<{ creditCardData: Blockchain }>()
);

export const payWithCardError = createAction(
  CreditCardPaymentActionType.PAY_WITH_CARD_SUCCESS,
  props<{ error: string }>()
);

export const refresh = createAction(CreditCardPaymentActionType.REFRESH);
