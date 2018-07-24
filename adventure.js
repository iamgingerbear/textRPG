const readline = require('readline-sync');
const Location = require('./constructors/location.js');
const Npc = require('./constructors/npc.js');
const Weapon = require('./constructors/weapon.js');
const Skill = require('./constructors/skill.js');
const Item = require('./constructors/item.js');
const Armour = require('./constructors/armour.js');
const Enemy = require('./constructors/enemy.js');
const Battle = require('./systems/battle.js');
const Trade = require('./systems/trading.js');
const Save = require('./saves/save.js');
const charCreation = require('./saves/newChar.js')
const fs = require('fs');

let char = fs.readFileSync('./saves/save.json')

const totalDefence = function(target)
{   
    let sum = target.armour.helmet.defence+target.armour.chest.defence+target.armour.gloves.defence+target.armour.legs.defence+target.armour.boots.defence;
    console.log('DEF: '+sum);
    return sum;
}

// start game
let response = readline.question('\nWould you like to start a new game or load a character? new/load\n');
let player = {};
if (response == 'new')
{
    // name player character
    let name = readline.question("\nGreat! Please write a name for your character\n");
    if (!name == /\w+/gi) 
    {
        name = readline.question("\nPlease use letters for your name\n");
    }

    player = charCreation(name);
    Save(player, player.name)
    console.log("\nPlayer creation complete!\n\n");
    }
else if (response == 'load')
    {
        //load char
        response = readline.question (`\nWhat is the name of the character you would like to load?\n`);
        char = fs.readFileSync(`./saves/${response}.json`);

        player = JSON.parse(char);
        Save(player, player.name);
        console.log("\nPlayer Loaded!\n\n");
    }
    player.listBag = function()
    {
        for (let i in player.bag)
        {
            let num = parseInt(i)+1;
        console.log(num + ') ' +player.bag[i].name + '\n   ' + player.bag[i].sell);
        }
    }
    player.addItemToBag = function(item) 
    {
        player.bag.push(item);
    }
    player.listSkills = function()
    {
        for (let i in player.skills)
        {
            let num = parseInt(i)+1;
        console.log(num + ') ' +player.skills[i].name);
        }
    }
    player.addSkill = function(item) 
    {
        if (player.skills.length <4) 
        {
            player.skills.push(item);
        }
        else
        {
            player.listSkills()
            response = readline.question('What skill do you want to replace? or do you want to cancel.\n');
            if(response == 'cancel')
            {
                return;
            }
            else
            {
                let num = response -1
                player.skills[num] = item;
            }
        }
    }
    player.removeItem = function(i) 
    {
        player.bag.splice(i);
    }
    player.increaseIntelligence = function(num)
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.intelligence += num;
            player.xp -= num;
        }
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        }
    }
    player.decreaseIntelligence = function(num)
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.intelligence == num;
            player.xp += num;
        }
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        }
    }
    player.increaseCharisma = function(num) 
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.charisma += num;
            player.xp -= num;
        } 
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        }
    }
    player.decreaseCharisma = function(num) 
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.charisma == num;
            player.xp += num;
        } 
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        }
    }
    player.increaseHealth = function(num) 
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.health += num;
            player.xp -= num;
        } 
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        }
    }
    player.decreaseHealth = function(num) 
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.health -= num;
            player.xp += num;
        }
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        }
    }
    player.increaseLuck = function(num) 
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.luck += num;
            player.xp -= num;
        } 
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        }
    }
    player.decreaseLuck = function(num) 
    {
        num = parseInt(num);
        if (num <= player.xp)
        {
            player.luck += num;
            player.xp += num;
        } 
        else 
        {
            console.log("\nyou don't have enough xp for that. You have: "+ player.xp + "xp left\n");
        } 
    }

    //Print player stats
    console.log("description: \n");
    console.log("Name:  "+player.name);
    console.log("Age: " +player.age);
    console.log("Race: " +player.race);
    console.log("Hair style: " + player.hairStyle);
    console.log("Hair colour: " + player.hairColour);
    console.log("Eye Colour: " + player.eyeColour);

    //stats
    console.log("\nstats: \n")
    console.log("XP: " + player.xp);
    console.log("INT: " + player.intelligence);
    console.log("CHR: " + player.charisma);
    console.log("HP: " + player.health);
    console.log("LCK: " +player.luck);
    console.log();
    console.log('ATT: '+player.weapon.attack);
    totalDefence(player);


    //begin the adventure
    const forest = new Location('forest')
    forest.description = 'An old forest, filled with mystery and the bodies of lost adventurers\n';
    forest.newInteraction('beside')
    console.log('\n\nYou awake in a clearing, sorrounded by centuries old trees. \nThe sounds of the ring through the air accompanied by leaves rustling as the dance in the light breeze.\n')
    let wepType = readline.question('as you go to push yourself up you place your hand on something... a weapon? What sort of weapon is this?\n')
    forest.beside = new Weapon(wepType,1,1,1);
    player.weapon = forest.beside;
    console.log('You pick up the ' + player.weapon.wepType + " and scout around. You can hear a couple people arguing nearby. You turn to try and get eyes on the people.\n" )
    
    forest['hunters'] = new Npc('Forest hunters');
    forest.hunters.description = "It looks to be a a pair of hunters. Rustic fur clothing, a bow and half-full quiver each\n"
    console.log(forest.hunters.description);
    let bow = new Item('Bow',2,10);
    forest.hunters.addItemToBag(bow);
    let quiver = new Item('Quiver',1,5);
    forest.hunters.addItemToBag(quiver);
    let furs = new Item('Furs',3,1);
    forest.hunters.addItemToBag(furs);
    let trapTools = new Item('Trap tools',3,1);
    forest.hunters.addItemToBag(trapTools);


    Save(player, player.name);

    console.log(`\nYou encountered a slime!\n`);
    let gel = new Item('Gel',2,7);
    let slime = new Enemy('Slime',2,1,0,0,0,5);
    slime.addItemToBag(gel);

    response = readline.question('would you like to aproach the hunters? y/n\n');
    if(response == 'y')
    {   
        console.log("\nyou walk towards the hunters. They don't notice you till you are nearly next to them.");
        console.log('Startled, they jump back and take aim towards you');
        console.log('The taller of the two laughs as he lowers his bow');
        console.log('Hunters: "I thought you were a bear for a second! What are you doing around here?"');
        response = readline.question('\nTell the truth? or make up a story? truth/lie\n');
        if (response == 'truth')
        {
            console.log(`\nYou: "I just woke up here, though I'm not sure where here is exactly... I'm `+ player.name + ` It's nice to meet you two"`);
            response = readline.question(`Hunters: "Oh, that does sound strange. We're just about to head back to town now, do you want to come with us?" y/n\n`)
        }
        else if (response === 'lie')
        {
            console.log(`\nYou: "Just traveling through, looked like a peaceful place. Name's ` + player.name + `, nice to meet you"`);
            response = readline.question(`Hunters: "It's nice to meet you too, we're going to head back to town, do you want to come with us?" y/n\n`)
        }
        else
        {
            console.log('\nYou decide to say nothing...');
            response = readline.question(`Hunters: "You look a bit lost, do you want us to accompany you to town?" y/n\n`)
        }
        if(response == 'y')
        {
            console.log(`\nYou take them up on their kind offer and head towards town.\nIt's not a far walk, and the sunlight cutting through the canopy gives it a sort of dreamlike atmosphere.\n`);
            console.log(`You make it to the city, though with your memory gone you aren't quite sure what to do now.`)
            console.log(`Hunter: "You seem like a nice guy, how about helping us out hunting?"`)
            console.log(`.. only an idiot would be silly enough to turn down such a nice offer`)
            let response = readline.question("\nDo you wish to join the hunters? y/n")
            if (response === 'n')
            {
                console.log(`\nHi, dev here. I was trying to give you a happy ending.\nAparently thats not happy enough for you.\nYa know what, fine. I'll sort this out for ya.\nDon't worry, it's on the house.`);
                console.log(`\n\n\n"Thats Him! He's a witch" someone shouts from afar.\nWithin seconds you are grabbed, strung up and set ablaze.\n\n${player.name} will live on as ash.`)
            }
            else
            {
                console.log(`You decide to join the hunters, they teach you the ways of the bow and are paid a fair wage.\nYou guys are basically family now.`);
                console.log(`\n\nAnd they live happily ever after.\n\nThe end.`)
            }
        }
        else
        {
            console.log(`As kind as that offer is, you turn them down. It's best to be wary of strangers.\nYou walk away and think about what else you should do.`)
        }
    }
    else
    {
        console.log('You leave them to their discussion. At least there is some comfort knowing there are other people around.\n');
        console.log(`The sun is high up in the sky, it would be best to start finding shelter\n`);
        let response = readline.question(`Which direction will you head in? n/e/s/w\n`);
        if (response == 'n')
        {
            console.log(`\nYou head north, walking past a myriad of trees for what feels like an eternity\nYou eventually make it to the edge of the forest.`)
            console.log(`A huge mountain lies just ahead of you, covering most of the sky.`);
            if(player.luck <= 2)
            {
                console.log(`you hear something in the bushes behind you. It's a slime!`);
                response = readline.question(`do you want to fight or run? fight/run`);
                if (response = 'run')
                {
                    console.log(`you manage to escape.`);
                }
                else
                {
                    if(Battle(player, slime))
                    {
                        player.money += slime.money
                        console.log('you aquired: ')
                        console.log(slime.money+'g')
                        for (let i in slime.bag)
                        {
                            console.log(slime.bag[i])
                            player.bag.push(slime.bag[i])
                        }
                        console.log('\nbattle completed\n');
                        console.log(`\nYou take a momment to gather yourself after the fight.\n`)
                    }
                    else
                    {
                        player.bag = []
                        console.log(`\nYou awake some time later.\nYou have lost all of your items.`);
                        console.log(`\nYou take a momment to gather yourself after the fight.\n`)
                    }
                }
            }

            console.log(`It's time to choose where to go after making it out of the forest\n`);
            response = readline.question(`Head north toward the mountain, follow the path east or follow it west. n/e/w\n`);
            if (response == 'n')
            {
                console.log(`\nYou head towards the mountain.\n Upon reaching the base you notice a small cave opening thats half covered with some bushes.\nYou push the bushes aside and step in.\n\n`)
                console.log(`It takes a momment for your eyes to adjust to the darkness.\nYou can make out some figures heading towards you...`)
                response = readline.question(`\nDo you wish to fight or flee? fight/flee\n`);
                if (response == 'fight')
                {
                    let skeleton = new Enemy('skeleton',10,5,5,4,100);
                    console.log(`A skeleton steps towards you... there is no backing out now.`);
                    if(Battle(player,skeleton))
                    {
                        console.log(`\mWow, you were not meant to win this fight... have you been editing the player file?`);
                        console.log(`\nAnyway, sorry. This was just a test of the systems... gonna have to call it here.\n Maybe you'll want to try a different path?.`);
                        return
                    }
                }
                else
                {
                    console.log(`You dash out of the cave, vowing to never enter it again.\nYou cover the entrance up as much as possible, hopefully you are the last to enter that place.`);
                    console.log(`\nWith darkness setting in, you have failed to find suitable shelter... nights are not friendly here. and your character is far too weak`);
                    console.log(`${player.name} freezes to death on the first night`);
                    return;
                }
            }
            else if (response == 'e')
            {
                console.log(`\nYou walk for a short while.\n You can almost taste the salt in the air as you make it to a beach.`);
                console.log(`It's not everyday you get a nice beach like this to yourself.\nYou decide to lay down and listen to the waves as they crash into the land.\nYou wake up shivering.. it's dark.. too late to find shelter.`);
                console.log(`It looks like this is as far as ${player.name} goes.\nTheir body is swept away by the tide after a couple hours, never to be seen again.`);
            }
            else if (response == 'w')
            {
                console.log(`\nYou walk for a short while.\nThere is another fork in the road but as you approach you are accosted by a young man`)
                console.log(`Man: "You got the toll? 5g's. Pay up if you want to make it out of here alive."`);
                let highwayman = new Enemy('Highwayman', 5,4,5,6,20)
                if (player.money>=5)
                {
                    response = readline.question(`\ndo you want to pay? y/n\n`)
                    if(response == 'y')
                    {
                        console.log(`you hand over 5g to the man\n`)
                        console.log(`\n\nMan: "Hah, they always pay up. I'm not a nice guy though..."`)

                    }
                    else
                    {
                        console.log(`\nYou try to run but the man was too fast.`)
                        
                    }
                    
                }
                else
                {
                    console.log(`\nLooks like you don't have the funds... what a shame.\n`)
                }
                if(Battle(player,highwayman))
                        {
                            console.log(`\nI didn't really expect this... eh.. `)
                            console.log(`\noh no, ${player.name} were struck by lightning right after winning the fight, what a shame...\n`)
                            return
                        }
                        else
                        {
                            console.log(`\nBetter luck next time.\n`)
                            return
                        }
                    
                
            }
        }
        else if (response == 'e')
        {
            console.log(`\nYou head eastward.\nYou walk for what feels like a few hours before making it to the edge.\nThere is nothing here but the ocean and a very steep cliff.\nIt's dark, the cold is setting in.`)
            let response = readline.question(`There are only two options left... jump or huddle up next to the tree. jump/tree`)
            if (response == 'tree')
            {
                console.log(`You huddle up next to a nearby tree to wait out the inevitable.\nWhere did you go wrong?\nHow could such a thing be avoided in the future?\nWhy did the developer of this game make such a shitty option possible?`)
                console.log(`\n${player.name}'s body is gradually reclaimed by nature.`);
                return
            }
        }
        else if (response == 's')
        {
            console.log(`You head south.\nAfter walking for a couple hours you can hear what sounds to civilisation.\nYou push on and make your way to a town.`)
            console.log(`First port of call is always the tavern, right?\nAs you enter the tavern you are greeted by a burly man`)
            console.log(`Burly man: "What are you doing back here, I left you for dead."`);
            console.log(`You: I'm sorry, do I know you?`)
            console.log(`Burly man: "Thats it twerp, you're in for it now"`)
            let burlyMan = new Enemy('Burly Man', 10,4,5,6,200)
            if(Battle(player,burlyMan))
            {
                console.log(`\nhow on earth are you that strong!\nYou are meant to die due to me being too lazy to write the rest of these options.`);
                console.log(`fine. you want to play that way.`)
                let megaMonster = new Enemy('Mega monster', 100,40,50,60,2000);
                console.log(`\nYou encountered a mega monster.`)
                if(Battle(player,megaMonster))
                {
                    console.log(`\nNope. I veto this.`)
                    console.log(`A superior being, the likes of which have never been seen before, emerges from the clouds above the city.\n It throws a massive spear made of light towards the town.`)
                    console.log(`Nobody in town survives. It's all ${player.name}'s fault.`);
                    return
                }
            }
        }
        else if (response == 'w')
        {
            console.log(`\nYou walk for a short while.\nYou make it to the edge of the treeline after a couple hours.\nThere is a fork in the road but as you approach you are accosted by a young man`)
            console.log(`Man: "You got the toll? 5g's. Pay up if you want to make it out of here alive."`);
            let highwayman = new Enemy('Highwayman', 8,4,5,6,20)
            if (player.money>=5)
            {
                response = readline.question(`\ndo you want to pay? y/n\n`)
                if(response == 'y')
                {
                    console.log(`you hand over 5g to the man\n`)
                    console.log(`\n\nMan: "Hah, they always pay up. I'm not a nice guy though..."`)

                }
                else
                {
                    console.log(`\nYou try to run but the man was too fast.`)
                        
                }
                    
            }
            else
            {
                console.log(`\nLooks like you don't have the funds... what a shame.\n`)
            }
            if(Battle(player,highwayman))
            {
                console.log(`\nI didn't really expect this... eh.. `)
                console.log(`\noh no, ${player.name} were struck by lightning right after winning the fight, what a shame...\n`)
                return
            }
            else
            {
                console.log(`\nBetter luck next time.\n`)
                return
            }
                    
                
        }
    }   
 
    

    

module.exports=(player);