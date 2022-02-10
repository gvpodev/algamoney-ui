import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent {

  @Input() error: string = ''
  @Input() control: FormControl = new FormControl()
  @Input() text: string = ''

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty
  }

}
