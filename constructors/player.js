const fs = require('fs');
const char = fs.readFileSync('./saves/save.json')
let player = JSON.parse(char)


function Player (name)
{
    this.xp = 6;
    this.intelligence = 0;
    this.charisma = 0;
    this.health = 0;
    this.luck = 0;
    this.money = 0;
    this.status = '';
    
    this.attack = 0;
    this.defence = 0;

    this.name = name;
    this.age = 20;
    this.race = 'human';
    this.hairStyle = 'short';
    this.hairColour = 'black';
    this.eyeColour = 'brown';
    this.weapon = {'attack':0};
    this.armour = {
        'helmet': {'defence':0},
        'chest' : {'defence':0},
        'gloves' : {'defence':0},
        'legs' : {'defence':0},
        'boots' : {'defence':0}
    }
    
    this.skills = [

    ];
    this.charm = '';
    this.bag = [{
        name: 'Cracked mirror',
        description: '',
        isTrap: false,
        isMagicItem: false,
        sell: 1,
        buy: 0 }];
        this.increaseIntelligence = function(num)
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.intelligence += num;
                this.xp -= num;
            }
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            }
        }
        this.decreaseIntelligence = function(num)
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.intelligence == num;
                this.xp += num;
            }
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            }
        }
        this.increaseCharisma = function(num) 
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.charisma += num;
                this.xp -= num;
            } 
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            }
        }
        this.decreaseCharisma = function(num) 
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.charisma == num;
                this.xp += num;
            } 
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            }
        }
        this.increaseHealth = function(num) 
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.health += num;
                this.xp -= num;
            } 
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            }
        }
        this.decreaseHealth = function(num) 
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.health -= num;
                this.xp += num;
            }
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            }
        }
        this.increaseLuck = function(num) 
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.luck += num;
                this.xp -= num;
            } 
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            }
        }
        this.decreaseLuck = function(num) 
        {
            num = parseInt(num);
            if (num <= this.xp)
            {
                this.luck += num;
                this.xp += num;
            } 
            else 
            {
                console.log("\nyou don't have enough xp for that. You have: "+ this.xp + "xp left\n");
            } 
        }
    
}


module.exports = (Player)