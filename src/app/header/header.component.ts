import { Blockchain } from './../final/final.model';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  coins: Observable<Blockchain[]>;

  ngOnInit() {}
}
