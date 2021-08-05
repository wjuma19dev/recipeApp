import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageDataService } from '../shared/storage-data.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticate: boolean;
    private userSub: Subscription;

    constructor(
        private _storageDataService: StorageDataService,
        private _authService: AuthService
    ) {}

    ngOnInit() {
        this.userSub = this._authService.user.subscribe(user => {
            this.isAuthenticate = !!user;
            // console.log(!user); // true
            // console.log(!!user); // false
        });
    }

    onStorageData() {
        this._storageDataService.storageRecipesData();
    }

    onFetchStorage() {
        this._storageDataService.fetchStorageData().subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

    onLogout() {
        this._authService.logout();
    }
    
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
