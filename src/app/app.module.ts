import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FinalComponent } from './final/final.component';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StoreModule } from '@ngrx/store';
import { addCoinReducer } from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { AppHttpInterceptor } from './http.interceptor';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ blockchain: addCoinReducer }),
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DisplayComponent,
    HelloComponent,
    FinalComponent,
    PaymentComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
