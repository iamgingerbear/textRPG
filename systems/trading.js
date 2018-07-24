const readline = require('readline-sync');
const Player = require('../constructors/player')

// save before battle
function Trade(player, npc) 
{
    let response = readline.question(`Do you want to buy or sell? buy/sell\n`)
    if(response == 'buy')
    {
        console.log('You have '+player.money+'g\n')
        console.log('What item would you like to buy?\n');
        npc.listBag();
        item = readline.question('\nPlease type the number of the item you would like to purchase\n')
        if (player.money >= npc.bag[item-1].buy) {
            player.money -= npc.bag[item-1].buy;
            player.addItemToBag(npc.bag[item-1]);
            
        }

    }
    else if (response == 'sell')
    {
        console.log('What item would you like to sell?');
        player.listBag();
        item = readline.question('\nPlease type the number of the item you would like to sell\n')
        player.money += player.bag[item-1].sell;
        player.removeItem(item-1)
    }
    console.log(`\nYou have `+player.money+`g left.`)
    console.log(`Your bag: `)
    player.listBag()
    response = readline.question('Would you like to trade again? y/n\n');
    if (response == 'y')
    {
        Trade(player,npc)
    }
}

module.exports = (Trade)