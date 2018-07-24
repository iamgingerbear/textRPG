function Weapon(name,att=1,spd=1,S=1) 
{
    this.weaponType = name;
    this.attack = att;
    this.speed = spd;
    this.sell= S;
    this.buy=0;   
}

module.exports = (Weapon)