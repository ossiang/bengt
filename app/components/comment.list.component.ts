import { Component, Input } from '@angular/core'
import { Comment } from '../models/comment'

@Component({
  moduleId: module.id,
  templateUrl: 'comment.list.component.html',
  selector: 'comment-list'
})
export class CommentList {
    @Input()
    comments : Comment[];
    
    getFormattedDate(ts) : string {
        let x : any = ts + "000";
        let date = new Date(x - 0);
        let local = date.toLocaleString();
        return local.substr(0, local.length - 3);
    }
}