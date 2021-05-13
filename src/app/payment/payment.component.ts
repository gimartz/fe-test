import { select, Store } from '@ngrx/store';
import { Hero } from './hero';
import { PaymentService } from './payment.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',

  providers: [PaymentService],
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  heroes: Hero[];
  editHero: Hero; // the hero currently being edited

  constructor(private heroesService: PaymentService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  add(
    creditCardNumber: string,
    cardHolder: string,
    expirationDate: string,
    securityCode: string
    //MonthlyAdvertisingBudget: number
  ): void {
    this.editHero = undefined;
    cardHolder = cardHolder.trim();
    securityCode = securityCode.trim();

    if (!cardHolder) {
      return;
    }

    // The server will generate the id for this new hero
    const newHero: Hero = {
      creditCardNumber,
      cardHolder,
      securityCode,

      expirationDate
    } as Hero;
    this.heroesService
      .addHero(newHero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService.deleteHero(hero.id).subscribe();
    /*
    // oops ... subscribe() is missing so nothing happens
    this.heroesService.deleteHero(hero.id);
    */
  }

  edit(hero) {
    this.editHero = hero;
  }

  search(searchTerm: string) {
    this.editHero = undefined;
    if (searchTerm) {
      this.heroesService
        .searchHeroes(searchTerm)
        .subscribe(heroes => (this.heroes = heroes));
    }
  }

  update() {
    if (this.editHero) {
      this.heroesService.updateHero(this.editHero).subscribe(hero => {
        // replace the hero in the heroes list with update from server
        const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
        if (ix > -1) {
          this.heroes[ix] = hero;
        }
      });
      this.editHero = undefined;
    }
  }
}
