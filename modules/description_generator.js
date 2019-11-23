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
    "awful","unkind","unfair","wet","dry","unreal","headonistic","steady",
    "philosophical","other-worldly","homely","quaint","adorable","agreeable",
    "repulsive","disturbed","jealous","eager","enchanting","expensive",
    "modern","thoughtless","troubled","nasty","frail","fragile","unsightly",
    "wild","wicked","putrid"
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
    let type = ["Queen","King","Emperor","Empress","Lord","Lady","Duke","Duchess",
                "Prince","Princess","Warlord","Hegamon","Minister","Priest","Priestess"
                ];
    let name_start = ["Abra","Folen","Gla","Bo","Hince","Taka","No","Fla",
                    "To","Glisto","Narn","Fmo","Djara","Tin","For","Phi","Be",
                    "Glum","Eri","Sala","Wen","Chri","Ange","Al-","Ri","","Ro",
                    "Arch"
    ];
    let sylables = ["A","I","U","E","O","Ma","Mi","Ba","Bi","Ka","Ki",""];
    let name_mid = [""," Van " + choose_from(sylables),""," Von " + choose_from(sylables),
                    " Mc" + choose_from(sylables),""," Mac"+ choose_from(sylables)];
    let name_end = ["sin","do","han","rot","djis","flom","craz","din","n","l","c","dy"];
    let bodyparts = ["hair","hand","foot","arm","side","crown","sight","eye","fist","boot"];
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
                        "E-","Van-","Ie-","Yy","Qin-"
                    ];
    let names_mid = ["no","gra","fla","offo","deeka","ra","dja","ti","clu","ban",
                    "ba","un","on","dun","peare","pro","al","","n","i"
                ];
    let names_end = ["fun","san","brok","boc","lain","ho","crop","po","la",
                    "bun","pun","kun","lun","pol","","rict","sama","dono",
                    "hal","speare","kens"
                ];

    let starts = ["Renowned","Famous","Forgotten","Remembered","Maligned",
                    "Despised","Ridiculed","Sought","Documented","Hated",
                    "Loved","Revered","Hunted"
                ];
    
    let rate = ["often","never","sometimes","occasionally","once-yearly"];
    let race = ["peoples","tribe","elders","women","men","race","sect",""]

    let about = `${choose_from(starts)} for their ${choose_from(activities)}, `;
    let name = choose_from(names_start) + choose_from(names_mid) + choose_from(names_end);
    about += `the ${name} ${choose_from(race)} are ${choose_from(rate)} described as ${choose_from(adjectives)}`;
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