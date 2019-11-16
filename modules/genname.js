
let generate = function(){
    var starts = ["Vos","Cal","Bra","La", "Le", "Ben-", "Fra","Min","El","Glam", "Grey-", "Porto-","High-", 
					"Co", "Chri", "Saint-", "Glum-","Has","Fro","Gla","Gli","Blu","Desolate-", "Mysterious-",
					"Ksa","O","A","E", "Stalin", "Lenin", "Haunting-", "Fallow-", "High", "Late", "Lake ", 
					"Lake A", "Lake E", "Mount A", "Lake O", "Mount E","Cape","Red-","Blue-","Green-",
					"Castle ", "Kings ", "Abbots ", "Dukes ", "Queens ", "Lady ", "Tsar ", "Dank ", "Rotton ",
					"Festering "
				];

	var mids = ["ford","cos","bra","ma","ka","bro","ich","lo","cole","si","se","fro","klo","gra","pre","spo", 
					"pun", "krel","kun","bo","hehe", "hoho", "","froo","ning","pla","wro","blaf", "cla", "ra", 
					"wo", "i","a","e","u","o"
				];

	var ends = ["nova","land","noc"," landing","sia","po","mra","mouth","tak"," water"," machi", "grad", "scotia", 
					"helm","man", " sword", "-yama","-bluff", "wold"," shadow"," farm", " willow", " mura", "naka", 
					" hill", "d","mia", "be", " bay", " leigh","berg","isle", " island"," cove","tt","k","s","p","r"," bottom", 
					" base", " region"
				];
							
	var pick_start = Math.round(Math.random()*(starts.length-1));
	var pick_mid = Math.round(Math.random()*(mids.length-1));
	var pick_end = Math.round(Math.random()*(ends.length-1));
    var landname = "" + starts[pick_start] + mids[pick_mid] + ends[pick_end];
    return landname;
}

module.exports = generate