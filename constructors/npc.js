function Npc(name) 
{
    this.name = name;
    this.description = '';
    this.bag = [];
    this.addItemToBag = function(item) 
    {
        this.bag.push(item);
    }
    this.listBag = function() 
    {
        for (let i in this.bag)
        {
            let num = parseInt(i)+1;
            console.log(num+ ') Item: ' + this.bag[i].name +'     Price: '+ this.bag[i].buy);
        }
    }
}

module.exports = (Npc)
