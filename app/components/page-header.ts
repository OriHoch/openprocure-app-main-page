import { Component, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'budgetkey-main-page-header',
  template: `
    <div class="budgetkey-main-page-header-container" [ngClass]="{collapsed: isCollapsed}">
      <div class="row">
        <div class="col-xs-2">
          <span class="menu-item">רכש פתוח</span>
        </div>
        <div class="col-xs-8">
          <div class="header-menu">
            <span class="menu-item active">רכש</span>
            <span class="menu-item">הדרכה</span>
            <span class="menu-item">מונחון רכש</span>
            <span class="menu-item">אודות</span>
          </div>

          <h1 class="text-center">אז באמת, איפה הרכש?!</h1>

          <div class="search-wrapper">
            <form ngNoForm method="get" [action]="searchUrl">
              <input type="text" placeholder="חפשו הכל.. רכש, רכש, רכש, רכש, או כל דבר אחר העולה על דעתכם.."
                [(ngModel)]="searchTerm" [ngModelOptions]="{standalone: true}">
              <button type="submit"></button>
            </form>
          </div>  
        </div>
        <div class="col-xs-2"></div>
      </div>
    </div>
  `
})
export class HeaderComponent {
  searchTerm: string = '';
  private isCollapsed: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    let scrollTop = this.document.documentElement.scrollTop;
    this.isCollapsed = scrollTop >= 50;
  }

  get searchUrl() {
    return 'http://next.obudget.org/app/search/#/search?term=' +
      encodeURIComponent(this.searchTerm);
  }
}
