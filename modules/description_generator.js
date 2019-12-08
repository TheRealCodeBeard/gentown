const seedrandom = require('seedrandom');
const words_library = require('./words.js');
let rng = null;
const mod = "Description | "; 

let choose_from = function(list){
    return list[Math.round(rng()*(list.length-1))];
};

let adjectives = words_library.adjectives;
let people_adjectives = words_library.people_adjectives;
let consonants = words_library.consonants;
let vowls = words_library.vowls;

let basic = function(name){
    return `Welcome to ${name} (${population()})`
};

let date = function(){
    let year = Math.round(rng() * 3000).toString();
    return year;
};

let leader = function(){
    let type = words_library.leader_type;
    let name_start = words_library.leader_name_start;
    let sylables =words_library.leader_name_sylable;
    let name_mid = [""," Van " + choose_from(sylables),""," Von " + choose_from(sylables),
                    " Mc" + choose_from(sylables),""," Mac"+ choose_from(sylables)];
    let name_end = words_library.leader_name_ends;
    let bodyparts = words_library.body_parts;
    let extend = () =>{
        if(rng()<0.4){
            return ` ${choose_from(adjectives)} ${choose_from(bodyparts)}`
        } else return "";
    };
    return `'${choose_from(type)} ${choose_from(name_start)}${choose_from(name_mid)}${choose_from(name_end)}` +
            `${extend()}'`;
};

let conclusion = function(){
    let scale = ["many","few","continuous","occasional",
                "little","extensive","far-reaching","devistating",
                "underwhelming","massive","era-defining","often-forgotten",
                "comment-worthy","giant"
            ];
    let event = ["famins","droughts","wars","celebrations",
                "invasions","cosmic events","catastrophies",
                "mysteries","investments","plague","disease",
                "wizards","wiches","warlocks","visitors",
                "tourists","floods","abundance","trade fairs",
                "deaths"
            ];
    return `has seen ${choose_from(scale)} ${choose_from(event)}`;
};

let history = function(){
    let part1 = `Since the year ${date()}, in the age of ${leader()}, `;
    let part2 = `this ${choose_from(adjectives)} place ${conclusion()}`; 
    return part1 + part2;
};

let population = function(){
    let pop = Math.round(rng() * 100000).toLocaleString("en-GB"); 
    return `Population ${pop}`;
};

let peoples = function(){
    let activities = ["art","theatre","science",
            "animal husbandry","farming","pottery","political system",
            "smell","height","religion","shamanism","morals","philosophy",
            "poverty","wealth","government","nature","poetry","music",
            "writing","cave art","hunting","canibalism","sports","wrestling",
            "masks","head dresses","vehicles","army","opinions","rituals",
            "nudity","prudeishness","quisine","health","drawing","helpfulness",
            "sarcasm","pelt"
    ];
    let names_start = ["Ta","Ma","Da","Kla","Engli","Ge","Ita","Fro","Cro",
                        "Ba","Bi","Bu","Pa","Pi","Pu","Qua","Qui","Qu",
                        "Fu","Fa","Fi","Pro","Gla","Un","A-","Ll","Ka","Ki","Ko",
                        "E-","Van-","Ie-","Yy","Qin-","N"
                    ];
    let names_mid = ["no","gra","fla","offo","deeka","ra","dja","ti","clu","ban",
                    "ba","un","on","dun","peare","pro","al","","n","i","o"
                ];
    let names_end = ["fun","san","brok","boc","lain","ho","crop","po","la",
                    "bun","pun","kun","lun","pol","","rict","sama","dono",
                    "hal","speare","kens","ah"
                ];
    let starts = ["Renowned","Famous","Forgotten","Remembered","Maligned",
                    "Despised","Ridiculed","Sought","Documented","Hated",
                    "Loved","Revered","Hunted"
                ];
    let rate = ["often","never","sometimes","occasionally","once-yearly","continuously","always"];
    let race = [" peoples"," tribe"," elders"," women"," men"," race"," sect",""]
    let about = `${choose_from(starts)} for their ${choose_from(activities)}, `;
    let name = choose_from(names_start) + choose_from(names_mid) + choose_from(names_end);
    about += `the ${name}${choose_from(race)} are ${choose_from(rate)} described as ${choose_from(people_adjectives)}`;
    return about;
};

let food = function(){
    let food = words_library.foods;
    let desire = [" much sought after","n ignored","n avoided","n intriguing",
                    " often consumed"," never wasted"," collected"," festival",
                    " mystical"," misguided"," family celebration", " celebration"
                ];
    let distance = ["local","regional","imported","scavanged",
                    "fermented","sun-dried","moon-soaked","sand-polished",
                    "boiled","ground","dried","washed","dampened"
                    ];
    let type = ["delicacy","ritual offering","drug",
                "party food","ceremonial food","dessert",
                "main course","grave offering","starter",
                "medicine","pet food", "animal feed","poison"
            ];
    let frequency = ["mostly","occasionaly","sometimes","always","sporadically",
                    "infrequently","periodically","sparingly"
                    ];
    
    let name_start = ["a","u","e","eo","ao","io","iu","ui","","abo","afo"
                        ,"rum","ulva","repo","ani","eni","uni","oni"
                    ];
    let name_mid = ["to","ti","tu","te","to","bra","bre","bru","bre","bro","lala",
                    "pa","pi","pu","pe","po","za","zi","zu","ze","zo"
                ];
    let name_end = ["m","n","l","b","p","t","s","k",
                "ding","ring","ridge","dy","ty","my"
                ];
    let preparation = [" in aspic"," in vinagar"," in jelly"," in gravey"," on biscuits",
                        " on toast"," carefully balanced",
                        "","","","","",""
                    ];
    let about = `A${choose_from(desire)} ${choose_from(type)} `
    about += `is ${choose_from(consonants)}${choose_from(name_start)}${choose_from(name_mid)}${choose_from(name_end)}, `;
    about += `it is ${choose_from(frequency)} made from ${choose_from(distance)} ${choose_from(food)}${choose_from(preparation)}`
    return about;
};

let weather = function(){
    let cadance = ["most","some","occasionnal short periods","short periods"];
    let weather = ["rains","is clear","is sunny","is cloudy","is cold","is wet",
                    "is muggy","is humid","is uncomfortably warm","is hot"
                    ];
    let compas = ["north","south","east","west",
                    "north east","north west","south east","south west",
                    "mountains","coast","lakes"
                ];
    let strength = ["heavy","light","strong","ghostly"]
    let type = ["winds blow","storms roll in","sand storms arrive","fog descends"];
    let about = `For ${choose_from(cadance)} of the year it ${choose_from(weather)} `;
    about += `and ${choose_from(strength)} ${choose_from(type)} from the ${choose_from(compas)}`;
    return about;
};

let music = function(){
    let cadance = ["occasionally","often","sometimes",
                    "continuously","repeatedly","frequently",
                    "regularly","consistently","from time to time",
                    "now and then","on and off","oftentimes"
                ];
    let times = ["at night","in the morning","over lunch","at festivals",
                "at funerals","in the evenings","at weekends","after work",
                "during religious gatherings","around villages","in towns",
                "on the road","in the fields","in woodland",""];
    let modernity = ["Traditional","Modern","Futuristic","Ancient"]
    let instrument = `${choose_from(consonants)}${choose_from(vowls)}${choose_from(vowls)}${choose_from(consonants).toLowerCase()}`
    let about = `${choose_from(modernity)} ${instrument} instruments `;
    about += `can be heard ${choose_from(cadance)} ${choose_from(times)}`
    return about;
};

let greeting = function(){
    let cadance = ["traditional","occasional","morning","evening","rare",
                    "common","secretive","formal","informal","causal",
                    "combative","nautical","tribal","fair-weather",
                    "ugly","unkind","sarcastic","polite"
                ];
    let greeting = `${choose_from(consonants)}${choose_from(vowls)}${choose_from(consonants).toLowerCase()}${choose_from(vowls)}`;
    let times = Math.round(rng()*3); 
    for(var i=0;i<times;i++){greeting+=`${choose_from(consonants).toLowerCase()}${choose_from(vowls)}`;}
    let negative = ["sadness","grief","unhappiness","pain","storminess","disaster"];
    let positive =["good","fine","godly","sunny","satisfying"
                ,`avoid ${choose_from(negative)} in`];
    let thing = ["health","day","week","meals","family health","child health","weather","seas"];
    let meaning = `${choose_from(positive)}`;
    let about = `A ${choose_from(cadance)} greeting is ${greeting}, meaning ${meaning} ${choose_from(thing)}`;
    return about;
};

let shuffle = function (a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

let get_describers = function(){
    let potential_describers = shuffle([
        history,
        peoples,
        food,
        weather,
        music,
        greeting
    ]);
    return [potential_describers.pop(),potential_describers.pop()];
};

let generate = function(name_seed){
    rng = seedrandom(name_seed);
    let actual_describers = get_describers();
    var description = `${basic(name_seed)}.`;
    actual_describers.forEach((d)=>description = `${description}\n${d()}.`);
    console.log(mod,"Description Length:",description.length);
    return description;
};

module.exports = generate