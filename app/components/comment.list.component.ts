import { Component, Input } from '@angular/core'
import { Comment }          from '../models/comment'

@Component({
  moduleId: module.id,
  templateUrl: 'comment.list.component.html',
  selector: 'comment-list'
})
export class CommentList {
    @Input()
    comments : Comment[];
}