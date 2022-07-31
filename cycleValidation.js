//storage => 2d matrix

let collectedGraphComponent= [] ; // contains graphcm of diff sheets

let graphComponentMatrix=[];

// for(let i=0 ; i<rows ; i++){
//     let row=[];
//     for(let j=0; j<cols ; j++){
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }


function isGraphCyclic(){

    let visited= [];
    let dfsVisited=[];

    for(let i=0 ; i<rows ; i++){
        let visitedRow =[];
        let dfsVisitedRow= [];

        for(let j=0 ; j<cols ; j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);

    }


    for(let i=0 ; i<rows ; i++){
        
        for(let  j=0 ; j<cols ; j++){
            if(visited[i][j] == false){
                let ret=dfsCycledetection(graphComponentMatrix , i , j , visited , dfsVisited);
                if(ret) return [i,j];
            }
        }
    }

    return null;
}

function dfsCycledetection(graphComponentMatrix, srcr , srcc , visited , dfsVisited){

    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    for(let children=0; children<graphComponentMatrix[srcr][srcc].length; children++){
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];

        if(visited[nbrr][nbrc] == false){
            let ret = dfsCycledetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if(ret == true){
                return true;
            }

        }

        else if(dfsVisited[nbrr][nbrc] == true){
            return true;
        }
    }

    dfsVisited[srcr][srcc]=false;
    return false;
}
