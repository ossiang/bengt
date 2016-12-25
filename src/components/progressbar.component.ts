import { Component, Input } from '@angular/core'

@Component({
  templateUrl: './progressbar.component.html',
  selector: 'progressbar'
})
export class Progressbar {
    @Input()
    property : number;

    @Input()
    title : string;

    getClass() {
      if (this.property > 79) {
        return 'progress-bar-success';
      } 
      // else if (this.property > 59) {
      //   return 'progress-bar-info';
      // }
      else if (this.property > 39) {
        return 'progress-bar-warning';
      }
      else {
        return 'progress-bar-danger';
      }
    }

    getWidth() {
      if (this.property > 80) {
        return '100';
      } 
      else if (this.property > 60) {
        return '75';
      }
      else if (this.property > 40) {
        return '50';
      }
      else if (this.property > 20) {
        return '25';
      }
      else {
        return '5';
      }
    }
}
