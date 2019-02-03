function addNewClass() {
	const bodyEl = document.querySelector("body");
	const elemText = bodyEl.outerHTML;

	const srhEl = 'XX';
	
	// const re = /class=("|').*XX.*("|')/ig;

	const re = /class=("|').*XX.*("|')/ig;

	let found = elemText.match(re);
	
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
	const regSpeshSimv = /.*XX.*/;
	
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
	const regBegClass = /([A-Za-z-^I]+)[\d]*[I]?XX{1}/;

	const regDataClass = /([\d]*)[^\d]*XX+/i;
	const regDataEd = /[\d]*([^\d-^I]*)[I]?XX/;
	const regImpot = /([I]?)XX+/;

	const regSizeClass = /XX+(.*)/;
	const regSizeMaxClass = /XX+(\d*)/;
	const regSizeMinClass = /XX+[\d]*[-]{1}(\d*)/;

	
	let nameClasses = [];
	

	for (const key in massClass ) {

		let dataClass = {
			nameClass: '',
			nameProp: '',
			znProp: '',
			edProp: '',
			importProp: '',
			maxSize: '',
			minSize: ''
		}
		
		//=====
		dataClass.nameClass = massClass[key];

        const nameProp = massClass[key].match(regBegClass)[1];


		if (nameProp && nameProp[1]) {
            for (const item in aliasClass) {
                if (item == nameProp) {
                    dataClass.nameProp = aliasClass[item];
                }
            }

		}

		
		let root7888 = massClass[key].match(regDataClass)[1];
		dataClass.znProp = root7888;


        root7888 = massClass[key].match(regDataEd);

		if (root7888) {
			if (root7888[1]) {
                dataClass.edProp = root7888[1];
			} else {
                dataClass.edProp = 'px';
			}
		}


		if (massClass[key].match(regImpot)[1]) {
			dataClass.importProp = ' !important';
		}


		//----
		if (massClass[key].match(regSizeClass)) {

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
			}

            if (item.minSize) {
                strWidthLimit = `@media (min-width: ${item.minSize}px) {
					${strPorpClass}
				}`;
            }

		}

        strAllCssProp += strWidthLimit;
	}


    console.log("VVVVVVVVVVVVVVVVVV", strAllCssProp );
    console.log("WWWWWWWWWWWWWWWWWW", nameClasses );
}



























