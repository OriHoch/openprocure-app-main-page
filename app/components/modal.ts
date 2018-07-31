import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'modal',
    template: `
      <div class="bkmodal-bg">
        <div class="bkmodal-dialog">                
          <div class="bkmodal-content">
              <button type="button" class="close" (click)="_close()">&times;</button>
              <div class="bkmodal-header">
                <h4 class="modal-title">{{title}}</h4>
              </div>
              <div class="bkmodal-body">
                <p [innerHtml]="text"></p>
              </div>
            </div>
        </div>
      </div>
`
})
export class ModalComponent {
  @Input() title: string;
  @Input() text: string;
  @Output('close') close = new EventEmitter();

  constructor() {
  }

  _close() {
    this.close.emit(null);
  }

}
