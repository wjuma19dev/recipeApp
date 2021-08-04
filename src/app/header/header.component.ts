import { Component } from '@angular/core';
import { StorageDataService } from '../shared/storage-data.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private _storageDataService: StorageDataService) {}

    onStorageData() {
        this._storageDataService.storageRecipesData();
    }

    onFetchStorage() {
        this._storageDataService.fetchStorageData().subscribe();
    }
}
