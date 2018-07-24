const fs = require('fs');


function Save(character,name) 
{
    fs.writeFileSync(`./saves/${name}.json`, JSON.stringify(character,null,2));
}

module.exports = (Save);