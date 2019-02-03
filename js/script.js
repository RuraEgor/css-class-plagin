function addNewClass() {
	const bodyEl = document.querySelector("body");
	const elemText = bodyEl.outerHTML;

	const srhEl = 'XX';
	
<<<<<<< HEAD
	// const re = /class=("|').*XX.*("|')/ig;

	const re = /class=("|').*XX.*("|')/ig;

	let found = elemText.match(re);
=======
	//	const con = elemText.replace(/class/g, "daaaaam");
	
	//	bodyEl.innerHTML = con;
	
	const re = /class=("|').*№.*("|')/ig;
	
	found = elemText.match(re);
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
	
	// console.log("rrrrrrrrrr", found );
	
	
	let massClass = [];
	
	for (const key in found) {
		found[key] = found[key].replace(/class/, "");
		found[key] = found[key].replace(/=/, "");
		found[key] = found[key].replace(/"/g, "");
		found[key] = found[key].replace(/'/g, "");
		
		if (found[key].match(/\s/g)) {
			
			let masClassInObj = found[key].split(" ");
			
			for (item of masClassInObj) {
				massClass.push(item);
			}
		} else {
			massClass.push(found[key]);
		}
	}
	
	
	//====  DELETE DUOBLICATE
<<<<<<< HEAD
	const regSpeshSimv = /.*XX.*/;
=======
	const regSpeshSimv = /.*№.*/;
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
	
	massClass = massClass.sort().reduce(function(arr, el){
		if(!arr.length || arr.length && arr[arr.length - 1] != el) {
			
			if ( el.match(regSpeshSimv)) {
				arr.push(el);
			}
		}
		return arr;
	}, []);
	
	console.log("match-delete-doubl", massClass);
	
	
	//====
<<<<<<< HEAD
	const regBegClass = /([A-Za-z-^I]+)[\d]*[I]?XX{1}/;

	const regDataClass = /([\d]*)[^\d]*XX+/i;
	const regDataEd = /[\d]*([^\d-^I]*)[I]?XX/;
	const regImpot = /([I]?)XX+/;

	const regSizeClass = /XX+(.*)/;
	const regSizeMaxClass = /XX+(\d*)/;
	const regSizeMinClass = /XX+[\d]*[-]{1}(\d*)/;

=======
	const regBegClass = /^[A-Za-z]+/i;
	const regDataClass = /([\d]*)[^\d]*№+/;
	const regDataEd = /[\d]*([^\d-^I]*)[I]?№+/;
	const regImpot = /([I]?)№+/;
	
	const regSizeClass = /№{1}(.*)$/i;
	
	const regSizeClassMax = /№{1}([\d]*).*$/i;
	const regSizeNeg = /№{1}[\d]*[-]{1}([\d]*)$/i;
	
	// const regSizeClass = /№+(.*)/i;
	
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
	
	let nameClasses = [];
	

	for (const key in massClass ) {

		let dataClass = {
			nameClass: '',
			nameProp: '',
			znProp: '',
<<<<<<< HEAD
			edProp: '',
=======
			edProp: 'px',
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
			importProp: '',
			maxSize: '',
			minSize: ''
		}
		
		//=====
<<<<<<< HEAD
		dataClass.nameClass = massClass[key];

        const nameProp = massClass[key].match(regBegClass)[1];


		if (nameProp && nameProp[1]) {
            for (const item in aliasClass) {
                if (item == nameProp) {
                    dataClass.nameProp = aliasClass[item];
                }
            }

=======
		dataClass.nameClas = massClass[key];
		
		const nameProp = found[key].match(regBegClass)[0];
		
		for (let item in aliasClass) {
			if (item == nameProp) {
				dataClass.nameProp = aliasClass[item];
			}
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
		}

		
		let root7888 = massClass[key].match(regDataClass)[1];
		dataClass.znProp = root7888;
<<<<<<< HEAD


        root7888 = massClass[key].match(regDataEd);

		if (root7888) {
			if (root7888[1]) {
                dataClass.edProp = root7888[1];
			} else {
                dataClass.edProp = 'px';
			}
		}


=======
		
		if (massClass[key].match(regDataEd)[1]) {
			dataClass.edProp = massClass[key].match(regDataEd)[1];
		}
		
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
		if (massClass[key].match(regImpot)[1]) {
			dataClass.importProp = ' !important';
		}


		//----
		if (massClass[key].match(regSizeClass)) {
<<<<<<< HEAD

            const limitSizeCssMax = massClass[key].match(regSizeMaxClass);
            if (limitSizeCssMax && limitSizeCssMax[1]) dataClass.maxSize = limitSizeCssMax[1];

            const limitSizeCssMin = massClass[key].match(regSizeMinClass);
            if (limitSizeCssMin && limitSizeCssMin[1]) dataClass.minSize = limitSizeCssMin[1];
        }

		//======
		nameClasses.push(dataClass);
	}


	//=============

	let strAllCssProp = '';

	for (const item of nameClasses) {

        let strPorpClass = '';

        let strPropClass = `${item.nameProp}: ${item.znProp}${item.edProp}${item.importProp};`;

        strPorpClass = `.${item.nameClass} {
        	${strPropClass}
        }`;


        let strWidthLimit = '';

		if (item.maxSize && item.minSize) {

            strWidthLimit = `@media (max-width: ${item.maxSize}px) and (min-width: ${item.minSize}px) {
				${strPorpClass}
			}`;

		} else {

			if (item.maxSize) {
                strWidthLimit = `@media (max-width: ${item.maxSize}px) {
					${strPorpClass}
				}`;
=======
			
			if (massClass[key].match(regSizeClassMax)) {
				dataClass.maxSize = massClass[key].match(regSizeClassMax)[1];
			}

			if (massClass[key].match(regSizeNeg)) {
				dataClass.minSize = massClass[key].match(regSizeNeg)[1];
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
			}

            if (item.minSize) {
                strWidthLimit = `@media (min-width: ${item.minSize}px) {
					${strPorpClass}
				}`;
            }

		}

        strAllCssProp += strWidthLimit;
	}
<<<<<<< HEAD


    console.log("VVVVVVVVVVVVVVVVVV", strAllCssProp );
    console.log("WWWWWWWWWWWWWWWWWW", nameClasses );
=======
	
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
>>>>>>> a48eb222fffe68792cb54c2f02241d1946d1090b
}



























