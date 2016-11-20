import { Component, Input } from '@angular/core'
import { Comment }          from '../models/comment'

@Component({
  selector: 'comment-list',
  templateUrl: './comment.list.component.html'
})
export class CommentList {
    @Input()
    comments : Comment[];
}
