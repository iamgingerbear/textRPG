function Location(name) 
{
    //basic stuff, name, description of location and the list of interactions
    this.location = name;
    this.description='';
    this.interaction=[];

    // function to add a new interaction
    this.newInteraction = function(item) 
    {
        this.interaction.push(item);
    }
    // function to add interactions to the location e.g. interaction = ['test'] would become Location.test
    this.listInteractions = function()
    {
      for (let i in this.interaction)
      {
        let x = this.interaction[i];
        this[x] = '';
      }
    }

}

module.exports = (Location)