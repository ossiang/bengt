import {Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'dateTransform'
})
export class DatePipe implements PipeTransform {
    transform(value){
        let x : any = value + "000";
        let date = new Date(x - 0);
        let local = date.toLocaleString();
        return local.substr(0, local.length - 3);
    }
}
