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
import { HttpClientXsrfModule } from '@angular/common/http';
//import { AppHttpInterceptor } from './http.interceptor';
import { PaymentComponent } from './payment/payment.component';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ blockchain: addCoinReducer }),
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    })
  ],
  declarations: [
    AppComponent,
    DisplayComponent,
    HelloComponent,
    FinalComponent,
    HeaderComponent,
    PaymentComponent
  ],
  // providers: [{
  //  provide: HTTP_INTERCEPTORS,
  // useClass: ServerErrorsInterceptor,
  // multi:true
  //}],

  bootstrap: [AppComponent]
})
export class AppModule {}
