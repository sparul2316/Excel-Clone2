let addSheetbtn = document.querySelector(".sheet-add-icon");
let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let activeSheetColor = "#ced6e0";


addSheetbtn.addEventListener("click" , (e)=>{
    let sheet = document.createElement("div");
    
    sheet.setAttribute("class" , "sheet-folder");
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
   

    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML= `
        <div class="sheet-content">Sheet ${allSheetFolders.length+1}</div>
    `;

    sheetsFolderCont.appendChild(sheet);
    
    //created individual storage
    createSheetDB();
    createGraphComponentMatrix();

    handleSheetActiveness(sheet);

    handleSheetRemoval(sheet);
    sheet.click();
  
    
})

function handleSheetDB(sheetIndx){ // prsenting current active sheetand graph rln
    sheetDb = collectedSheetDB[sheetIndx];
    graphComponentMatrix=collectedGraphComponent[sheetIndx];
}

//assigning cell values
function handleSheetProperties(){ 

    for(let i=0 ; i<rows ; i++){
        for(let j =0 ; j<cols ; j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstCell =document.querySelector(".cell");
    firstCell.click();
}

//handling ui

function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");

    for(let i=0 ; i<allSheetFolders.length ; i++){
        allSheetFolders[i].style.backgroundColor= "transparent";
    }

    sheet.style.backgroundColor=activeSheetColor;

}

//putting the data; begining of representing current sheet
function handleSheetActiveness(sheet){
    sheet.addEventListener("click", (e)=>{
        let sheetIndx = Number(sheet.getAttribute("id")); // 0-based index;

        handleSheetDB(sheetIndx);
        handleSheetProperties();
        handleSheetUI(sheet);
    })
}

//sheet removal

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e)=>{
        //e.buttonn-> 0-> left, 2-> right;;

        if(e.button !== 2) return;
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length==1){
            alert("You need to have atleast one sheet! ");
            return;
        }

        let response = confirm("Your sheet will be removed permanently , Are your sure?")
        if(response === false) return;

        let sheetIndx = Number(sheet.getAttribute("id"));
        collectedSheetDB.splice(sheetIndx,1);
        collectedGraphComponent.splice(sheetIndx , 1);

        handleSheetUIRemoval(sheet); // change in ui


        // bring sheet 1 to active by default acter removal;
        sheetDb = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProperties();

    })
}

function handleSheetUIRemoval(sheet){

    //ui 

    sheet.remove();

    let allSheetFolders = document.querySelectorAll(".sheet-folder");

    for(let i=0 ; i<allSheetFolders.length ; i++){
        allSheetFolders[i].setAttribute("id", i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerHTML= `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor="transparent";
    }

    allSheetFolders[0].style.backgroundColor= activeSheetColor;
}

function createSheetDB(){

    let sheetDb= [];

    for(let i=0; i<rows; i++){
        let sheetRow=[];
        for(let j=0; j<cols; j++){

            let cellProp={
                bold:false,
                italic:false,
                underline:false,
                alignment:"left",
                fontFamily:"san-serif",
                fontSize:"14",
                fontColor:"#000000",
                BGcolor:"#000000", // just for indication purpose
                value:"",
                formula:"",
                children:[],
            }
            sheetRow.push(cellProp);
        }
        sheetDb.push(sheetRow);
    }

    collectedSheetDB.push(sheetDb);
    
}

function createGraphComponentMatrix(){
    let graphComponentMatrix=[];

    for(let i=0 ; i<rows ; i++){
        let row=[];
        for(let j=0; j<cols ; j++){
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }

    collectedGraphComponent.push(graphComponentMatrix);


}