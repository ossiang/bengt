import {Component} from '@angular/core'

@Component({
    selector: 'bengt',
    moduleId: module.id,
    styleUrls: ['app.component.css'],
    template: `
        <div>
            <page-header></page-header>
            <div class="container">
                <div class="row">
                    <navbar></navbar>
                </div>
                <div class="row">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `
})
export class AppComponent{
}