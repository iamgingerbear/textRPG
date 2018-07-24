function EnemyCreator(name,hp,att,def,dge,mon,stat = '') 
{
    this.name = name;
    this.description = '';
    this.health = hp;
    this.attack = att;
    this.defence = def;
    this.dodge = dge;
    this.money = mon;
    this.bag = [];
    this.status = stat;
    this.addItemToBag = function(item) 
    {
        this.bag.push(item);
    }
}

module.exports = (EnemyCreator)