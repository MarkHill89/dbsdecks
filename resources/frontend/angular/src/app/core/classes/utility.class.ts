export class Utility {

    constructor() {}
    
    keys(obj) {
        return Object.keys(obj);
    }

    cardListItemBackground(color){
        switch(color){
            case 'Red':
                return 'list-group-item-danger';
            case 'Blue':
                return 'list-group-item-primary';
            case 'Green':
                return 'list-group-item-success';
            case 'Yellow':
                return 'list-group-item-warning';
            case 'Black':
                return 'list-group-item-dark';
            case 'Blue;Red':
                return 'list-group-item-danger-primary';
            case 'Green;Red':
                return 'list-group-item-danger-success';
            case 'Red;Yellow':
                return 'list-group-item-danger-warning';
            case 'Blue;Green':
                return 'list-group-item-primary-success';
            case 'Blue;Yellow':
                return 'list-group-item-primary-warning';
            case 'Green;Yellow':
                return 'list-group-item-success-warning';
        }
    }
}
