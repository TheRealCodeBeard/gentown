const mod = "Name | ";

module.exports = async function (context, req) {
    let name_generator = require("../modules/name_generator.js");
    let name = name_generator();
    context.log(mod,name);
    context.res = {    
        body: name
    };
};