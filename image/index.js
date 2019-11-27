module.exports = async function (context, req) {
    const generate_map = require("../modules/map_generator.js");
    const array_to_image = require("../modules/array_to_image.js");
    let in_name = (req.query.name||req.body);
    context.log('Got name:',in_name);
    let {map_name,map,colours} = generate_map(in_name);
    let buffer = array_to_image.generate_buffer({w:400,h:400},colours,in_name,map);
    context.res = {
        isRaw: true,
        headers: {
            "Content-Type":"image/png"
        },
        body:buffer
    };
};
