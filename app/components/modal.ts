import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'modal',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="_close()" >&times;</button>
                     <h4 class="modal-title">{{title}}</h4>
                   </div>
                   <div class="modal-body">
                     <p [innerHtml]="text"></p>
                   </div>
                 </div>
              </div>`
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
