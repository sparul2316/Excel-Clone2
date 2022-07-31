for(let i=0; i<rows; i++){
    for(let j=0; j<cols;j++){

        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e)=>{
            let address = addresBarDisplay.value;

            let[activecell, cellProp] = getActiveCell(address);
            let enteredData = activecell.innerText;
            if(enteredData==cellProp.value){
                return;
            }

            cellProp.value = enteredData;  
            removeChildFromParent(cellProp.formula + " ");      
            cellProp.formula="";    
            updateChildrenCells(address);
        
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", async(e)=>{

    let inputFormula= formulaBar.value;
    if(e.key==="Enter" && formulaBar.value){
        // if change in formula break old relations and establich new
        let address=  addresBarDisplay.value;
        let[cell, cellProp]= getActiveCell(address);
        if(inputFormula !=cellProp.formula)removeChildFromParent(cellProp.formula);

        
        addChildtoGraphComponent(inputFormula , address);
        //check formula is cyclic or not then only evaluate
        let isCyclic = isGraphCyclic(graphComponentMatrix);

        if(isCyclic!=null){
            let response=confirm("Your formula is cyclic. Do you want to trace it's path?");
        
            while(response){
                //keep on tracking colour till user is fine
                await isGraphCyclicTracePath(graphComponentMatrix, isCyclic); //pause here too/
                response=confirm("Your formula is cyclic. Do you want to trace it's path?");
            }

            removeChildFromGraphComponent(inputFormula, address);
            return;
        }

        let evaluatedvalue = evaluateFormula(inputFormula);

        //changes in ui/ux and storage
        setCellUIAndCellProp(evaluatedvalue, inputFormula, address);
        addchildToParent(inputFormula);// new relation
        updateChildrenCells(address);
       
    }
})

//update children value on change of parent

function updateChildrenCells(parentAddress){
    let[parentCell, parentCellProp] = getActiveCell(parentAddress);
    let children =parentCellProp.children;

    for(let i=0 ; i<children.length ; i++){
        let childAddress= children[i];
        let[childCell , childCellProp] = getActiveCell(childAddress);
        let childFormula= childCellProp.formula;
        let evaluatedvalue = evaluateFormula(childFormula) ;
        setCellUIAndCellProp(evaluatedvalue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}

//adding to graph component

function addChildtoGraphComponent(formula , childAddress){
    let[crid , ccid] = getRidCid(childAddress);
    let encodedFormula = formula.split(" ");

    for(let i =0; i<encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let[prid , pcid] = getRidCid(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid , ccid]);
      
        }
    }

}

//adding child to parent

function addchildToParent(formula){
    let childAddress = addresBarDisplay.value;
    let encodedformula = formula.split(" ");
    for(let i=0 ;i< encodedformula.length ; i++){

        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue<=90){
            let[parentCell, parentCellProp]= getActiveCell(encodedformula[i]);
            parentCellProp.children.push(childAddress);

        }
    }
}

//remove child fro0m parent on change

function removeChildFromParent(formula){
    let encodedFormula = formula.split(" ");
    let childaddress = addresBarDisplay.value;

    for(let i=0; i<encodedFormula.length ; i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);

        if(asciivalue>=65 && asciivalue<=90){
            let[parentcell, parentcellProp]= getActiveCell(encodedFormula[i]);
            let indx = parentcellProp.children.indexOf(childaddress);
            parentcellProp.children.splice(indx, 1);
            console.log(parentcellProp);
           
        }
    }
}

//remove child from graph

function removeChildFromGraphComponent(formula , childAddress){

    let [crid, ccid]= getRidCid(childAddress);

    let encodedFormula = formula.split(" ");

    for(let i=0; i<encodedFormula.length ; i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);

        if(asciivalue>=65 && asciivalue<=90){
            let [prid, pcid] = getRidCid(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop([crid,ccid]);
       
        }
    }

}


//to evaluate formula
function evaluateFormula(formula){
    let encodedformula = formula.split(" ");
    for(let i=0 ;i< encodedformula.length ; i++){

        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue<=90){
           let[cell, cellProp]= getActiveCell(encodedformula[i]);
           encodedformula[i]= cellProp.value;
        }
    }
    let decodedFormula = encodedformula.join(" ");

    return eval(decodedFormula);
}

//changing ui/ux and storage
function setCellUIAndCellProp(evaluatedvalue, formula, address ){

    let[cell, cellProp]= getActiveCell(address);

    cell.innerText= evaluatedvalue;//ui
    cellProp.value = evaluatedvalue;//storage
    cellProp.formula=formula;//storage

}

