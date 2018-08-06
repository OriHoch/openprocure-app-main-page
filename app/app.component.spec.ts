import 'karma-test-shim';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import { AppComponent } from './app.component';

window['prefetchedData'] = {
  "key": "reports/open-procure-main-page",
  "value": {
    "details": {
      "num_central": 14,
      "num_exemptions": 17835,
      "num_office": 1529,
      "num_office_publishers": 79,
      "total_amount": 40127080867.22,
      "year": 2017
    },
    "doc_id": "reports/open-procure-main-page",
    "key": "open-procure-main-page"
  }
};

describe('AppComponent', function () {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        BudgetKeyCommonModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
      ]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );

});
