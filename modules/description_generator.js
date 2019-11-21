const seedrandom = require('seedrandom');
let rng = null;
const mod = "Description | "; 

let choose_from = function(list){
    return list[Math.round(rng()*(list.length-1))];
};

let adjectives = [
    "small","lucious","wind-swept","dank","grimey","happy",
    "hope-filled","dull","sad","glossy","hateful","dangerous",
    "mysterious","fair","fine","keen","sharp","deadly","terrible",
    "awful","unkind","unfair"
];

let adjective = function(){
    return choose_from(adjectives);
};

let basic = function(name){
    return `Welcome to ${name} (${population()})`
};

let date = function(){
    let year = Math.round(rng() * 3000).toString();
    return year;
};

let leader = function(){
    let type = ["Queen","King","Emperor","Empress","Lord","Lady"];
    let name_start = ["Abra","Folen","Gla","Bo","Hince","Taka","No","Fla",
                    "To","Glisto","Narn","Fmo","Djara","Tin","For","Phi","Be",
                    "Glum","Eri","Sala","Wen","Chri","Ange"
    ];
    let name_end = ["sin","do","han","rot","djis","flom","craz","din","n","l","c","dy"];
    let bodyparts = ["hair","hand","foot","arm","side","crown","sight","eye"];
    let extend = () =>{
        if(rng()<0.4){
            return ` ${choose_from(adjectives)} ${choose_from(bodyparts)}`
        } else return "";
    };
    return `'${choose_from(type)} ${choose_from(name_start)}${choose_from(name_end)}` +
            `${extend()}'`;
};

let conclusion = function(){
    let scale = ["many","few","continuous","occasional",
                "little","extensive","far-reaching"];
    let event = ["famins","droughts","wars","celebrations",
                "invasions","cosmic events","catastrophies",
                "mysteries","investment"];
    return `has seen ${choose_from(scale)} ${choose_from(event)}`;
};

let history = function(){
    let part1 = `Since ${date()}, in the age of ${leader()}, `;
    let part2 = `this ${adjective()} place ${conclusion()}`; 
    return part1 + part2;
};

let population = function(){
    let pop = Math.round(rng() * 100000).toLocaleString("en-GB"); 
    return `Population ${pop}`;
};

let peoples = function(){
    let activities = ["art","theatre","science",
            "animal husbandry","farming","pottery","political system",
            "smell","height","religion","shamanism","morals","philosophy"
    ];
    let names_start = ["Ta","Ma","Da","Kla","Engli","Ge","Ita","Fro","Cro"];
    let names_mid = ["no","gra","fla","offo","deeka","ra","dja","ti","clu","ban"];
    let names_end = ["fun","san","brok","boc","lain","ho","crop","po","la"];
    let about = `Renound for their ${choose_from(activities)}, `;
    let name = choose_from(names_start) + choose_from(names_mid) + choose_from(names_end);
    about += `the ${name} peoples are often described as ${choose_from(adjectives)}`;
    return about;
};

let generate = function(name_seed){
    rng = seedrandom(name_seed);
    let describers = [
        history,
        peoples,
    ];
    var description = `${basic(name_seed)}.`;
    describers.forEach((d)=>description = `${description}\n${d()}.`);
    console.log(mod,"Description Length:",description.length);
    return description;
}

module.exports = generate