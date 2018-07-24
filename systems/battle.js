const readline = require('readline-sync');


// save before battle
function Battle(player, enemy, playerParty, enemyParty) 
{
    const totalDefence = function(target)
{   
    let sum = target.armour.helmet.defence+target.armour.chest.defence+target.armour.gloves.defence+target.armour.legs.defence+target.armour.boots.defence;
    return sum;
}
const totalDodge = function(target)
{   
    let sum = target.armour.helmet.dodge+target.armour.chest.dodge+target.armour.gloves.dodge+target.armour.legs.dodge+target.armour.boots.dodge;
    return sum;
}
const playDodgeRoll = function (dge = playDge){
    let chance = dge *2.5;
    Roll = Math.floor(Math.random() * 100);
    return chance >= Roll
}
const enemDodgeRoll = function (dge = enemDge){
    let chance = dge *2.5;
    Roll = Math.floor(Math.random() * 100);
    return chance >= Roll
}

    let playHp = player.health * 5 + 10;
    let playAtt = player.weapon.attack * 5;
    let playDef = totalDefence(player);
    let playDge = totalDodge(player);
    let playSpd = player.weapon.speed;

    let enemHp = enemy.health * 5;
    let enemAtt = enemy.attack * 5;
    let enemDef = enemy.defence;
    let enemDge = enemy.dodge;
    let enemSpd = enemy.speed;
    let enemStat = '';
    let enemTurns = 0;

    enemDge = enemDge - playSpd
    playDge = playDge - enemSpd
    
   

    let playDefHold = 0;
    let playDefLast = false;

    const playFight = function (action, dge)
    {   
        console.log(typeof action)
        if (enemTurns > 0)
        {
            enemTurns--;
        }

        if (playDefLast) //reset def to normal
        {
            playDefLast = false;
            playDef = playDefHold;
        }
        if (action == 'def') //defend
        {
            if (playDef == 0) {
                console.log('\nthat has no effect... your defence stat 0\n')
            } 
            else
            {
                playDef * 1.5;
                console.log('\ndefence rose to: ' + playDef + '\n')
            }
            
        }
        else if (typeof action == 'number')
        {
            if (enemDodgeRoll())
            {
                console.log('\nAttack missed.\n');
                return
            }
            let skill = player.skills[action-1]
            enemHp -= skill.damage;
            console.log('Enemy damaged by '+ skill.damage);
            if (!skill.status == '')
            {
                enemStat = skill.status;
                enemTurns = skill.effectTurns;
                console.log('Enemy affected by'+ skill.status+', for '+skill.effectTurns + ' turns');
                
            }
        }
        else  // attack
        {
            if (enemDodgeRoll())
            {
                console.log('\nAttack missed.\n');
            }
            else
            {
                let att =playAtt - enemDef
                if (att < 1) 
                {
                att = 1;
                }
                console.log('\nPlayer attacks for: ' + att);
                enemHp -= att
                console.log(`Enemy health is down to: ` + enemHp + '\n');
            }
        }
    }

    const enemFight = function (target, dge)
    {   
       console.log(`\nYour enemy attacks!`)
            if (playDodgeRoll())
            {
                console.log('Attack missed.\n');
            }
            else
            {
                let att = enemAtt - playDef;
                if (att < 1) 
                {
                att = 1;
                }
            
                console.log('\nEnemy attacks for: ' + att);
                playHp -= att;
                console.log(`Your health is down to: ` + playHp+'\n');
            
            }
            
    }

    while (playHp > 0 && enemHp > 0)
    {
        let dge = enemDge

        if (playDefLast == false)
        {
            playDefHold = playDef
        }
        console.log('\nWhat would you like to do?')
        let action = readline.question(`att/def/skill\n`);
        if (action == 'skill')
        {
            player.listSkills()
            action = readline.question(`Please type the number of the skill you would like to use\n`);
            action = parseInt(action)
        }
        playFight(action, dge);
        dge = playDge;
        enemFight(player, dge);
    
    
    }
    if (enemHp <= 0 && playHp > 0) {
        console.log('You defeated the enemy!\n')
        return true;
    }
    else if (playHp <= 0 && enemyHp > 0)
    {
        console.log(`Maybe you'll do better in the next life?\n`)
        return false;
    }
}

module.exports = (Battle)