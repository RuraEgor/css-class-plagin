function addNewClass() {
	const bodyEl = document.querySelector("body");
	const elemText = bodyEl.outerHTML;
	
	//	const con = elemText.replace(/class/g, "daaaaam");
	
	//	bodyEl.innerHTML = con;
	
	const re = /class=("|').*@.*("|')/ig;
	
	found = elemText.match(re);
	
	console.log("rrrrrrrrrr", found );
	
	
	let massClass = [];
	
	for (key in found) {
		found[key] = found[key].replace(/class/, "");
		found[key] = found[key].replace(/=/, "");
		found[key] = found[key].replace(/"/g, "");
		found[key] = found[key].replace(/'/g, "");
		
		if (found[key].match(/\s/g)) {
			
			let masClassInObj = found[key].split(" ");
			
			for (item of masClassInObj) {
				massClass.push(item);
			}
			
			// found.splice(key, 1);
		} else {
			massClass.push(found[key]);
		}
	}
	
	
	//====  DELETE DUOBLICATE
	const regSpeshSimv = /.*@.*/;
	
	massClass = massClass.sort().reduce(function(arr, el){
		if(!arr.length || arr.length && arr[arr.length - 1] != el) {
			
			if ( el.match(regSpeshSimv)) {
				arr.push(el);
			}
		}
		return arr;
	}, []);
	
	console.log("match", massClass);
	
	
	//====
	const regBegClass = /^[A-Za-z]+/i;
	const regDataClass = /([\d]*)[^\d]*@+/i;
	const regDataEd = /[\d]*([^\d-^!]*)[!]?@+/i;
	const regImpot = /([!]?)@+/i;
	const regSizeClass = /@+(.*)/i;
	
	
	nameClasses = [];
	

	for ( key in massClass ) {
		
		dataClass = {
			nameClas: '',
			nameProp: '',
			znProp: '',
			edProp: '',
			importProp: false,
			maxSize: '',
			minSize: ''
		}
		
		//=====
		dataClass.nameClas = massClass[key];
		
		const nameProp = found[key].match(regBegClass)[0];
		
		for (let item in aliasClass) {
			console.log("dddddddddd-88888", item );
			console.log("dddddddddd-nnnnnn", nameProp );
			
			if (item == nameProp) {
				dataClass.nameProp = aliasClass[item];
			}
		}

		
		let root7888 = massClass[key].match(regDataClass)[1];
		dataClass.znProp = root7888;
		
		
		root7888 = massClass[key].match(regDataEd)[1];
		dataClass.edProp = root7888;
		
		
		if (massClass[key].match(regImpot)[1]) {
			dataClass.importProp = true;
		}
		
		//----
		if (massClass[key].match(regSizeClass)) {
			let root7888 = massClass[key].match(regSizeClass)[1];
			if (root7888) {
				dataClass.maxSize = root7888;
			}
		}
		
		nameClasses.push(dataClass);
		
		console.log("WWWWWWWWWWWWWWWWWW", nameClasses );
	}
	
}
