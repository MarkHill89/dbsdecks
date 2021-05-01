import { StoreConfig, EntityState, EntityStore, Query, QueryEntity, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filters } from './filters';

interface FiltersState extends EntityState<Filters> {}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'filter-store', idKey: '_id'})
export class FiltersStore extends Store<Filters> {
    constructor() {
        super({});
    }
}

@Injectable({ providedIn: 'root' })
export class FiltersQuery extends Query<FiltersState> {
    filters$ = this.select();
    constructor(protected store: FiltersStore) {
        super(store);
    }
}

