let rows=100;
let cols=26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont= document.querySelector(".address-row-cont");
let cellsCont= document.querySelector(".cells-cont");
let addresBarDisplay=document.querySelector(".address-bar");
let body = document.querySelector("body");

for(let i=0; i<rows ; i++){
    let addressCol= document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

for(let i=0; i<cols ; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText=String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}

//  to create cells => first rows then col(2d);

for(let i =0; i<rows ; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for(let j=0 ; j<cols; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");
        
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        rowCont.appendChild(cell,i,j);
        addressDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCont);
}

// adding listener to display the adress of the cell in the formula bar

function addressDisplay(cell,i,j){
    cell.addEventListener("click", (e) => {
        let rowID = i+1;
        let colID = String.fromCharCode(65+j);
        addresBarDisplay.value=`${colID}${rowID}`;

    })
}

//getting the first cell;
let firstCell =document.querySelector(".cell");
firstCell.click();