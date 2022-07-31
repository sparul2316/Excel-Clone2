let collectedSheetDB =[] // contains all sheet db

let sheetDb= [];

{
    let addSheetbtn = document.querySelector(".sheet-add-icon");
    addSheetbtn.click();
    
}

// for(let i=0; i<rows; i++){
//     let sheetRow=[];
//     for(let j=0; j<cols; j++){

//         let cellProp={
//             bold:false,
//             italic:false,
//             underline:false,
//             alignment:"left",
//             fontFamily:"san-serif",
//             fontSize:"14",
//             fontColor:"#000000",
//             BGcolor:"#000000", // just for indication purpose
//             value:"",
//             formula:"",
//             children:[],
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDb.push(sheetRow);
// }

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize= document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".input-color-text");
let BGcolor =document.querySelector(".input-color-back");
let alignment = document.querySelectorAll(".alignment");

let leftAlign = alignment[0];
let centerAlign= alignment[1];
let rightAlign = alignment[2];

let activeColorProp ="#d1d8e0";
let inactiveColorProp="#ecf0f1";

// getting the cell in the ui/ux as well the storage object

function getActiveCell(address){
    
    let [rid , cid] = getRidCid(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDb[rid][cid];

    return [cell, cellProp];
}

function getRidCid(address){

    let rid =  (Number)(address.slice(1)-1);
    let cid = (Number)(address.charCodeAt(0)-65);

    return [rid, cid];
}

//bold
bold.addEventListener("click", (e)=>{
    let address = addresBarDisplay.value;
    let[cell, cellProp] = getActiveCell(address);

       // accessing and changing the property inside storage
    cellProp.bold =!cellProp.bold;
       // change in the ui ux;
    cell.style.fontWeight = cellProp.bold? "bold": "normal";
        // change in the ui/uyx part of elemnt clicked
    bold.style.backgroundColor = cellProp.bold?  activeColorProp:inactiveColorProp;
})

//italic
italic.addEventListener("click", (e)=>{
    let address= addresBarDisplay.value;
    let[cell, cellProp] = getActiveCell(address);

    cellProp.italic=!cellProp.italic;

    cell.style.fontStyle = cellProp.italic? "italic":"normal";

    italic.style.backgroundColor= cellProp.italic? activeColorProp:inactiveColorProp;

})

//underline
underline.addEventListener("click", function(e){
    let address = addresBarDisplay.value;
    let [cell, cellProp]= getActiveCell(address);

    cellProp.underline=!cellProp.underline; // change in storage
    cell.style.textDecoration = cellProp.underline? "underline":"none";
    underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp;//ui ux(2);
  
})

//fontSize
fontSize.addEventListener("change", function(e){
    let address = addresBarDisplay.value;
    let [cell, cellProp]= getActiveCell(address);

    cellProp.fontSize= fontSize.value; //change in storage
    cell.style.fontSize = cellProp.fontSize +"px";//change in ux
    fontSize.value = cellProp.fontSize;
})

//fontfamily

fontFamily.addEventListener("click", (e)=>{
    let address = addresBarDisplay.value;
    let [cell, cellProp]= getActiveCell(address);

    cellProp.fontFamily= fontFamily.value;

    cell.style.fontFamily= cellProp.fontFamily;

})

//fontcolor 

fontColor.addEventListener("change", function(e){
    let address = addresBarDisplay.value;
    let [cell, cellProp]= getActiveCell(address);

    cellProp.fontColor=fontColor.value;
    cell.style.color=cellProp.fontColor;
    fontColor.value= cellProp.fontColor;

})

//BGCOLor
BGcolor.addEventListener("change", function(e){
    let address = addresBarDisplay.value;
    let [cell, cellProp]= getActiveCell(address);

    cellProp.BGcolor= BGcolor.value;
    cell.style.backgroundColor=cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})


//alignment

alignment.forEach((alignElem)=>{


    alignElem.addEventListener("click", function(e){
        let address = addresBarDisplay.value;
        let [cell, cellProp]= getActiveCell(address);

        let alignValue = alignElem.classList[0];

        cellProp.alignment= alignValue; // change in storage
        cell.style.textAlign= cellProp.alignment;


        switch(alignValue){

            case "left":
                leftAlign.style.backgroundColor= activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

            case "center":

                leftAlign.style.backgroundColor= inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

            case "right":
                leftAlign.style.backgroundColor= inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
        }
    })


})


//cell wise properties-customising for each cell


let allCells= document.querySelectorAll(".cell");

for(let i=0; i<allCells.length ; i++){
     addListenToAttachcellProperties(allCells[i]);
}

function addListenToAttachcellProperties(cell){
    cell.addEventListener("click", (e)=>{
        let address = addresBarDisplay.value;
        let[rid, cid]=getRidCid(address);
        let cellProp = sheetDb[rid][cid];


        //apply cell properties
        cell.style.fontWeight = cellProp.bold? "bold":"normal";
        cell.style.fontStyle = cellProp.italic? "italic": "normal";
        cell.style.textDecoration = cellProp.underline? "underline":"none";
        cell.style.fontSize = cellProp.fontSize +"px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.BGcolor==="#000000" ? "transparent":cellProp.BGcolor;
        cell.style.textAlign= cellProp.alignment;



        // apply properties ui container
        bold.style.backgroundColor = cellProp.bold? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic? activeColorProp : inactiveColorProp;//ui ux(2);
        underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp;
        fontColor.value= cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value=cellProp.fontFamily;
        switch(cellProp.alignment){

            case "left":
                leftAlign.style.backgroundColor= activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

            case "center":

                leftAlign.style.backgroundColor= inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;

            case "right":
                leftAlign.style.backgroundColor= inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
        }

        let formulaBar= document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}