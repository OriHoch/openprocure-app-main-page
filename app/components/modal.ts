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
                     <p>{{text}}</p>
                   </div>
                 </div>
              </div>`,

    styles: [
      `
.modal-dialog {
  position: fixed;
  z-index: 100;
  margin: 20px;
  width: calc(100% - 42px);
  top: 0;
  left: 50%;
  margin-left: calc(20px - 50%);
  background: white;
  border: 1px solid black;
}
        `
    ]
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
