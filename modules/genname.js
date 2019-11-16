var web_starts = ["Vos","Cal","Bra","La", "Le", "Ben-", "Fra","Min","El","Glam", "Grey-", "Porto-","High-", 
    "Co", "Chri", "Saint-", "Glum-","Has","Fro","Gla","Gli","Blu","Desolate-", "Mysterious-",
    "Ksa","O","A","E", "Stalin", "Lenin", "Haunting-", "Fallow-", "High", "Late", "Lake ", 
    "Lake A", "Lake E", "Mount A", "Lake O", "Mount E","Cape","Red-","Blue-","Green-",
    "Castle ", "Kings ", "Abbots ", "Dukes ", "Queens ", "Lady ", "Tsar ", "Dank ", "Rotton ",
    "Festering "
];

var web_mids = ["ford","cos","bra","ma","ka","bro","ich","lo","cole","si","se","fro","klo","gra","pre","spo", 
    "pun", "krel","kun","bo","hehe", "hoho", "","froo","ning","pla","wro","blaf", "cla", "ra", 
    "wo", "i","a","e","u","o"
];

var web_ends = ["nova","land","noc"," landing","sia","po","mra","mouth","tak"," water"," machi", "grad", "scotia", 
    "helm","man", " sword", "-yama","-bluff", "wold"," shadow"," farm", " willow", " mura", "naka", 
    " hill", "d","mia", "be", " bay", " leigh","berg","isle", " island"," cove","tt","k","s","p","r"," bottom", 
    " base", " region"
];

var japanese_starts = ["Kuma","Asa","Haru","Aki","Fuku","Kyo","To","Ba","A","I"];
var japanese_mids = ["","da","to","ba","ka","ya"];
var japanese_ends = ["kyo","machi","mura","yama","gawa"," kawa"," shima","jima","be"];

var viking_starts = ["Fj","Dj","Ey","Bol"];
var viking_mids = ["o","oro","ara","ja","arn","sta"];
var viking_ends = ["helm","heim","hala","sey","land","lir"];

var english_starts = ["Hon","Brid","Beam","Nether","Weather","Scar","West","Black"];
var english_mids = ["i","er"," over","ling","sea","piddle"];
var english_ends = ["port","ton","ly","mouth"," River"," Old Town","hammer","pool","hinton"];

let pick_sets = function()
{
    let sets = [
        [web_starts,web_mids,web_ends],
        [japanese_starts,japanese_mids,japanese_ends],
        [viking_starts,viking_mids,viking_ends],
        [english_starts,english_mids,english_ends]
    ];
    let chosen_set = Math.round(Math.random()*(sets.length-1));
    console.debug("Set:",chosen_set);
    let set = sets[chosen_set];
    return {
        starts:set[0],
        mids:set[1],
        ends:set[2]
    };
}

let generate = function(){
    const {starts,mids,ends} = pick_sets();
	var pick_start = Math.round(Math.random()*(starts.length-1));
	var pick_mid = Math.round(Math.random()*(mids.length-1));
	var pick_end = Math.round(Math.random()*(ends.length-1));
    var landname = "" + starts[pick_start] + mids[pick_mid] + ends[pick_end];
    return landname;
}

module.exports = generate