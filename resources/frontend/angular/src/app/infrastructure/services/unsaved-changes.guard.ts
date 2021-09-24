import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type canDeactivateType = Observable<boolean> | 
                         Promise<boolean> | 
                         boolean; 
export interface CanComponentDeactivate {
    canDeactivate: () => canDeactivateType;
}

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}