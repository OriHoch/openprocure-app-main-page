import { Component, Input, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import * as _ from 'lodash';
import * as d3 from 'd3';
import { UtilsService, ScrollyService } from '../services';
import {ScrollyListener} from "../services/scrolly";

@Component({
  selector: 'budgetkey-main-page-summary',
  template: `
    <div class="budgetkey-main-summary-container step" data-id="summary-description" 
      [ngClass]="{active: isActive, collapsed: isCollapsed}">
      <div class="description">
        <span>
        בלה בלה בלה בלה בלה בלה בלה
        </span>
      </div>
    </div>
    <div class="transition-layer" #transitionLayer></div>
  `
})
export class SummaryComponent implements ScrollyListener {
  @Input() amount: number = 0;
  @Input() year: number = 0;
  @ViewChild('container') container: ElementRef;
  @ViewChild('transitionLayer') transitionLayer: ElementRef;

  private _isCollapsed = false;

  isActive: boolean = false;
  private transitionSource: any;
  private transitionTargets: Array<any>;

  get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }

  onScrolly(id: string, progress: number) {
    if (id === 'summary-description') {
      this.isActive = progress > 0.3;
      if (progress >= 0.7) {
        this.isCollapsed = true;
        this.animate((progress - 0.7)/0.3*1.6);
      } else {
        this.isCollapsed = false;
        this.animate(0);
      }
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document,
              private utils: UtilsService,
              private scroller: ScrollyService) {
    this.scroller.subscribe(this);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      let scroll = window.pageYOffset || document.documentElement.scrollTop;
      this.transitionSource = {
        node: d3.select(this.container.nativeElement),
        background: '#FF5A5F',
        bounds: (() => {
          const bounds = this.container.nativeElement.getBoundingClientRect();
          const size = 350;
          return {
            left: (bounds.left + bounds.right) / 2 - size / 2,
            top: bounds.bottom - size + scroll,
            right: (bounds.left + bounds.right) / 2 + size / 2,
            bottom: bounds.bottom,
            width: size,
            height: size,
          };
        })(),
      };

      let transitionTargets = this.document.querySelectorAll('.vis-kind-func');
      this.transitionTargets = _.map(transitionTargets, (element: any) => {
        const bounds = element.querySelector('svg').getBoundingClientRect();
        const x = (bounds.left + bounds.right) / 2;
        const y = (bounds.top + bounds.bottom) / 2 + scroll;
        const r = 50;
        return {
          node: d3.select(element),
          bounds: {
            left: x - r,
            top: y - r,
            right: x + r,
            bottom: y + r,
            width: r * 2,
            height: r * 2,
          },
        };
      });

      const layer = d3.select(this.transitionLayer.nativeElement);
      layer.selectAll('div')
        .data(this.transitionTargets)
        .enter()
        .append('div')
        .style('background', this.transitionSource.background)
        .style('border-radius', '50%')
        .style('position', 'absolute')
        .style('opacity', 1)
        .style('left', this.transitionSource.bounds.left + 'px')
        .style('top', this.transitionSource.bounds.top + 'px')
        .style('width', this.transitionSource.bounds.width + 'px')
        .style('height', this.transitionSource.bounds.height + 'px')
        .style('opacity', 0);
    }, 100);
  }

  formatValue(value: number): string {
    return this.utils.bareFormatValue(value, 0);
  }

  valueSuffix(value: number): string {
    return this.utils.getValueSuffix(value);
  }

  animate(t: number) {
    function _(t: number, i: number, pow?: number) {
      if (!pow) pow=1;
      let ret = t - (6-i)*0.1;
      if (ret<0) ret = 0;
      if (ret>1) ret = 1;
      ret = ret ** pow;
      return ret;
    }
    const layer = d3.select(this.transitionLayer.nativeElement);
    layer.selectAll('div')
      // .data(this.transitionTargets)
      .style('left', (d: any, i: number) => ((1-_(t,i))*this.transitionSource.bounds.left + _(t,i)*d.bounds.left) + 'px')
      .style('top', (d: any, i: number) => ((1-_(t,i))*this.transitionSource.bounds.top + _(t,i)*d.bounds.top) + 'px')
      .style('width', (d: any, i: number) => ((1-_(t,i,.20))*this.transitionSource.bounds.width+ _(t,i,.20)*d.bounds.width) + 'px')
      .style('height', (d: any, i: number) => ((1-_(t,i,.20))*this.transitionSource.bounds.height + _(t,i,.20)*d.bounds.height) + 'px')
      .style('opacity', (d: any, i: number) => _(t,i) > 0 ? (_(t,i) < 0.99 ? 0.7*(1-_(t,i))**0.2 : 0) : 0)
  }
}
