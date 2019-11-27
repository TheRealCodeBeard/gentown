const mod = 'Description |'

module.exports = async function (context, req) {
    const generate = require("../modules/description_generator.js");
    let in_name = (req.query.name||req.body);
    
    let description = generate(in_name);
    context.log(mod,"Got:",in_name);
    context.log(mod,"Sending:",description);
    
    context.res = {    
        body: description
    };
};