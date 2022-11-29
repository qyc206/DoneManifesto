// puzzle board is 5x4
var rows = 5;
var cols = 4;

// keep track of current positions for each piece
var piecesLocationTracker = {}; // piece # : place on board

// variables for dragging functionality
var draggedPiece;
var swapWithPiece;

// keep track of number of correctly placed pieces
var correctlyPlacedCount = 0;

window.onload = function(){
    let count = 1;

    // initialize puzzle board
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < cols; c++){
            // create piece using img tag
            let piece = document.createElement('img');
            piece.src = "images/empty/empty_"+count+".jpg";
            // piece.src = "";

            count++;

            // add drag functionality to piece
            piece.addEventListener("dragstart", dragStart); // click on piece
            piece.addEventListener("dragover", dragOver);   // dragging a piece
            piece.addEventListener("dragenter", dragEnter); // dragging a piece onto another
            piece.addEventListener("dragleave", dragLeave); // dragging a piece away from another
            piece.addEventListener("drop", dragDrop);       // dropping a piece onto another
            piece.addEventListener("dragend", dragEnd);     // after dropping a piece onto another

            // add piece to puzzle board
            document.getElementById('puzzle-board').append(piece);
        }
    }

    // set up a pieces holder and puzzle board key
    let pieces = [];
    for (let i = 1; i <= rows*cols; i++){
        pieces.push(i.toString());
        piecesLocationTracker[i.toString()] = "0";
    }

    // randomize pieces
    for (let i = 0; i < pieces.length; i++){
        let j = Math.floor(Math.random()*pieces.length);
        let temp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = temp;
    }

    // display pieces in pieces holder
    for (let i = 0; i < pieces.length; i++){
        // create piece using img tag
        let piece = document.createElement('img');
        piece.src = "images/rubiks/"+pieces[i]+".jpg";

        // add drag functionality to piece
        piece.addEventListener("dragstart", dragStart); // click on piece
        piece.addEventListener("dragover", dragOver);   // dragging a piece
        piece.addEventListener("dragenter", dragEnter); // dragging a piece onto another
        piece.addEventListener("dragleave", dragLeave); // dragging a piece away from another
        piece.addEventListener("drop", dragDrop);       // dropping a piece onto another
        piece.addEventListener("dragend", dragEnd);     // after dropping a piece onto another

        // add piece to pieces holder
        document.getElementById('pieces').append(piece);
    }
}

function dragStart() {
    draggedPiece = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    swapWithPiece = this;
}

function dragEnd() {
    // ignore any dragged pieces that are empty
    if (draggedPiece.src.includes("empty")){
        return;
    }

    // update count based on dragged piece
    updateCorrectlyPlacedCount(draggedPiece, swapWithPiece);
    // update count based on dropped on piece
    if (!swapWithPiece.src.includes("empty")){
        updateCorrectlyPlacedCount(swapWithPiece, draggedPiece);
    }

    // swap dragged piece with dropped on piece

    // (1) both are actual pieces, just swap their locations
    if (!swapWithPiece.src.includes("empty")){  // note: dragged piece cannot be empty
        let origDraggedLocation = piecesLocationTracker[getPieceValStr(draggedPiece)];
        let origSwapWithLocation = piecesLocationTracker[getPieceValStr(swapWithPiece)];

        updatePiecesLocationTracker(draggedPiece, origSwapWithLocation);
        updatePiecesLocationTracker(swapWithPiece, origDraggedLocation);  

        let currImg = draggedPiece.src;
        let otherImg = swapWithPiece.src;
        draggedPiece.src = otherImg;
        swapWithPiece.src = currImg;  
    }
    // (2) dropped on piece is an empty piece 
    else {
        let currImg = draggedPiece.src;
        // update empty piece to be the new position (0 if in piece holder)
        let otherImg = "images/empty/empty_"+piecesLocationTracker[getPieceValStr(draggedPiece)]+".jpg";      
        
        updatePiecesLocationTracker(draggedPiece, getPieceValStr(swapWithPiece));

        draggedPiece.src = otherImg;
        swapWithPiece.src = currImg;  
    }

    // update correctly placed count
    document.getElementById("correctlyPlaced").innerText = correctlyPlacedCount;

    // handle scenario where all pieces are correctly placed
    if (correctlyPlacedCount == rows*cols){
        handlePuzzleSolved();
    }
}

function updateCorrectlyPlacedCount(piece, otherPiece) {
    // check if the dragged piece is already in the correct spot
    let alreadyCorrectlyPlaced = 
        (getPieceValStr(piece) == piecesLocationTracker[getPieceValStr(piece)])
    // check if the piece is dropped in the right spot
    let correctlyPlaced = isPieceInCorrectPosition(piece, otherPiece);

    // if the piece is correctly placed when it was not already, 
    // add 1 to count
    if (correctlyPlaced && !alreadyCorrectlyPlaced){
        correctlyPlacedCount += 1;
    } 
    // if the piece was already correctly placed but is moved to incorrect spot, 
    // remove 1 from count
    else if (alreadyCorrectlyPlaced && !correctlyPlaced){
        correctlyPlacedCount -= 1;
    }
}

function updatePiecesLocationTracker(piece, newLocation) {
    // no need to update blank pieces
    if (piece.src.includes("empty")){
        return;
    }

    // update piece location
    let pieceValStr = getPieceValStr(piece);
    piecesLocationTracker[pieceValStr] = newLocation;
}

function isPieceInCorrectPosition(piece, otherPiece) {
    // define the desired and new location for dragged piece
    let draggedDesiredLocationStr = getPieceValStr(piece);

    let draggedNewLocationStr;  // new location varies depending on if the piece is empty
    if (otherPiece.src.includes("empty")){  
        draggedNewLocationStr = getPieceValStr(otherPiece); // empty piece name has the location
    } else {
        draggedNewLocationStr = piecesLocationTracker[getPieceValStr(otherPiece)];
    }

    let draggedDesiredLocationInt = parseInt(draggedDesiredLocationStr);
    let draggedNewLocationInt = parseInt(draggedNewLocationStr);

    // determine if the desired location matches new location
    if (draggedDesiredLocationInt != draggedNewLocationInt){
        return false;
    }
    return true;
}

function getPieceValStr(piece) {
    let url = piece.src;

    let isEmpty = false;
    if (url.includes("empty")){
        isEmpty = true;
    }

    let urlArray = url.split("/");
    let imgArray = urlArray[urlArray.length-1].split(".");

    if (isEmpty){
        return imgArray[0].split("_")[1];
    } else {
        return imgArray[0];
    }
}

function handlePuzzleSolved() {
    document.getElementById("puzzle-status").innerText = "DONE";
}