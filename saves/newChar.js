
const Player = require('../constructors/player.js');
const readline = require('readline-sync')
const Armour = require('../constructors/armour.js');
const Weapon = require('../constructors/weapon.js');

function charCreation(name)
{
    if (!name == /\w+/gi) 
    {
        name = readline.question("\nplease use letters for your name\n");
        
    }
    // check to make sure name is accepetable
    player = new Player(name);
    console.log('\nyour name is ' + player.name + '\n\n');
    response = readline.question('\nwould you like to change it? y/n\n');
    if (response == 'y') 
    {
        player.name = readline.question("\nenter your name\n");
        if (!name == /\w+/gi) 
        {
            console.log("\ntry again after you've sobered up.");
            
        }
    } 
    //finish creating characternew
    player.age = readline.question("\nHow old is " +player.name+ " ?\n");
    player.race = readline.question("\nWhat race is " +player.name+ " ? (e.g. human, elf, goblin)\n");
    player.hairStyle = readline.question("\nwhat hairstyle is "+player.name+" rocking?\n");
    player.hairColour = readline.question("\n..and what hair colour?\n");
    player.eyeColour = readline.question("\neye colour?\n");
    player.armour.helmet = new Armour('none');
    player.armour.chest = new Armour('none');
    player.armour.gloves = new Armour('none');
    player.armour.legs = new Armour('none');
    player.armour.boots = new Armour('none');
    player.weapon = new Weapon('none');

    //set values for att/def ect
    console.log("\nalright, we are almost done now!\n");
    console.log("\nI'm going to give you a whole 6 points to spend on your stats\n");
    console.log("\nsplit this up between intelligence, charisma, health and luck\n");
    console.log("\nI'd spend it all now if I were you.\n\n");
    
    while (player.xp > 0)
    {
        player.increaseIntelligence(readline.question(player.xp + 'xp left, set intelligence value: \n'));
        player.increaseCharisma(readline.question(player.xp + 'xp left, set charisma value: \n'));
        player.increaseHealth(readline.question(player.xp + 'xp left, set health value: \n'));
        player.increaseLuck(readline.question(player.xp + 'xp left, set luck value: \n'));
    }
    
    return player
    
}

module.exports = (charCreation);