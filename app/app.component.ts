import {Component, ViewChild} from '@angular/core';
import { BudgetKeyMainPageService } from './services';
import {ScrollyService} from "./services/scrolly";

@Component({
  selector: 'my-app',
  template: `
      <budgetkey-container>
        <div class="container-fluid scroll" style="position: relative">
            <div class="non-sticky">
              <budgetkey-main-page-header></budgetkey-main-page-header>
              <div class="text-center">
                <div class="description">
                   <span>
                   בלה בלה בלה 
                   <br/>
                   בלה בלה בלה         
                   <small>
                   בלה
                   </small>
                   </span>
                </div>
              </div>
            </div>
        </div>
      </budgetkey-container>
  `,
})
export class AppComponent {

  private funcCategories: any[];
  private econCategories: any[];
  private incomeCategories: any[];
  private totalAmount: number = 0;
  private year: number;

  constructor(private mainPage: BudgetKeyMainPageService,
              private scrolly: ScrollyService) {
    this.mainPage.getBubblesData().then((bubbles) => {
      this.year = bubbles.year;
      this.funcCategories = bubbles.func;
      this.econCategories = bubbles.econ;
      this.incomeCategories = bubbles.income;
      this.totalAmount = 0;
      this.funcCategories.forEach((category: any) => {
        this.totalAmount += category.amount;
      });
    });
  }

  ngAfterViewInit() {
    this.scrolly.init();
  }
}
