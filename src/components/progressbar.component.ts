import { Component, Input } from '@angular/core'

@Component({
  templateUrl: './progressbar.component.html',
  selector: 'progressbar'
})
export class Progressbar {
    @Input()
    property : number;

    @Input()
    factor : number;

    getClass() {
      let value = this.property * this.factor;
      if (value > 79) {
        return 'progress-bar-success';
      } 
      // else if (value > 59) {
      //   return 'progress-bar-info';
      // }
      else if (value > 39) {
        return 'progress-bar-warning';
      }
      else {
        return 'progress-bar-danger';
      }
    }

    getWidth() {
      let value = this.property * this.factor;
      if (value > 80) {
        return '100';
      } 
      else if (value > 60) {
        return '75';
      }
      else if (value > 40) {
        return '50';
      }
      else if (value > 20) {
        return '25';
      }
      else {
        return '5';
      }
    }
}
