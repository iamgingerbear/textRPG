function ItemCreation(name,S=0,B=0,tra = false,mag = false) 
{
    this.name = name;
    this.description = '';
    this.isTrap = tra;
    this.isMagicItem = mag;
    this.sell=S;
    this.buy=B;
}

module.exports = (ItemCreation)