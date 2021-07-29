import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    @Output() feactureSelected: EventEmitter<string> = new EventEmitter();

    constructor() {}

    onClick(feature: string) {
        this.feactureSelected.emit(feature);
    }
}
