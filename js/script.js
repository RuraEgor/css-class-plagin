function addNewClass() {
	const bodyEl = document.querySelector("body");
	const elemText = bodyEl.outerHTML;
	
	//	const con = elemText.replace(/class/g, "daaaaam");
	
	//	bodyEl.innerHTML = con;
	
	const re = /class=("|').*№.*("|')/ig;
	
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
	const regSpeshSimv = /.*№.*/;
	
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
	const regDataClass = /([\d]*)[^\d]*№+/;
	const regDataEd = /[\d]*([^\d-^I]*)[I]?№+/;
	const regImpot = /([I]?)№+/;
	
	const regSizeClass = /№{1}(.*)$/i;
	
	const regSizeClassMax = /№{1}([\d]*).*$/i;
	const regSizeNeg = /№{1}[\d]*[-]{1}([\d]*)$/i;
	
	// const regSizeClass = /№+(.*)/i;
	
	
	nameClasses = [];
	

	for ( key in massClass ) {
		
		dataClass = {
			nameClas: '',
			nameProp: '',
			znProp: '',
			edProp: 'px',
			importProp: '',
			maxSize: '',
			minSize: ''
		}
		
		//=====
		dataClass.nameClas = massClass[key];
		
		const nameProp = found[key].match(regBegClass)[0];
		
		for (let item in aliasClass) {
			if (item == nameProp) {
				dataClass.nameProp = aliasClass[item];
			}
		}

		
		let root7888 = massClass[key].match(regDataClass)[1];
		dataClass.znProp = root7888;
		
		if (massClass[key].match(regDataEd)[1]) {
			dataClass.edProp = massClass[key].match(regDataEd)[1];
		}
		
		if (massClass[key].match(regImpot)[1]) {
			dataClass.importProp = ' !important';
		}
		
		//----
		if (massClass[key].match(regSizeClass)) {
			
			if (massClass[key].match(regSizeClassMax)) {
				dataClass.maxSize = massClass[key].match(regSizeClassMax)[1];
			}

			if (massClass[key].match(regSizeNeg)) {
				dataClass.minSize = massClass[key].match(regSizeNeg)[1];
			}
		}
		
		nameClasses.push(dataClass);
		
		console.log("WWWWWWWWWWWWWWWWWW", nameClasses );
	}
	
	//==================================
	
	let allScringStyle = '';
	
	for ( item of nameClasses ) {
		
		let cssProp = `.${item.nameClas} {
			${item.nameProp}: ${item.znProp}${item.edProp}${item.importProp}
		};`;
		
		
		let cssSizeProp = cssProp;
		
		if (item.maxSize) {
			cssSizeProp = `@media (max-width: ${item.maxSize}px) {
				${cssProp}
			}`;
		}
		
		if (item.minSize) {
			cssSizeProp = `@media (min-width: ${item.minSize}px) {
				${cssProp}
			}`;
		}
		
		if (item.maxSize && item.minSize) {
			cssSizeProp = `@media (max-width: ${item.maxSize}px) and (min-width: ${item.minSize}px) {
				${cssProp}
			}`;
		}
		
		allScringStyle += ` ${cssSizeProp}`;
		
		console.log("bbbbbbbbbbbbbbbbbbb", allScringStyle );
	}
	
	
	var css = allScringStyle,
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
	
	style.type = 'text/css';
	if (style.styleSheet){
		// This is required for IE8 and below.
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	
	head.appendChild(style);
}
