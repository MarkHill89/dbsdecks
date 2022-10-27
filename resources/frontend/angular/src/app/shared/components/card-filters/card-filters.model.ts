export class CardFiltersModel {

    public cardType  = ['Leader', 'Battle', 'Extra', 'Z-Leader', 'Z-Battle'];
    
    public rarity = ['Common', 'Uncommon', 'Rare', 'Starter Rare', 'Super Rare', 'Promo', 'Secret Rare'];

    public color = [
        {name: "Red", value: "Red"},
        {name: "Blue", value: "Blue"},
        {name: "Green", value: "Green"},
        {name: "Yellow", value: "Yellow"},
        {name: "Black", value: "Black"},
        {name: "Red/Blue", value: "Blue;Red"},
        {name: "Red/Green", value: "Green;Red"},
        {name: "Red/Yellow", value: "Red;Yellow"},
        {name: "Red/Black", value:"Black;Red"},
        {name: "Blue/Green", value: "Blue;Green"},
        {name: "Blue/Yellow", value: "Blue;Yellow"},
        {name: "Blue/Black", value: "Black;Blue"},
        {name: "Green/Yellow", value: "Green;Yellow"},
        {name: "Green/Black", value: "Black;Green"},
        {name: "Yellow/Black", value: "Black;Yellow"}
    ];

}