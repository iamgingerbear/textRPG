function Skill(name, dmg, eff = '', trn = 0) 
{
    this.name = name;
    this.damage = dmg;
    this.effect = eff;
    this.effectTurns = trn;
}

module.exports = (Skill)