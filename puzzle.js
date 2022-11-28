// puzzle board is 5x4
var rows = 5;
var cols = 4;

// variables for dragging functionality
var draggedPiece;
var swapWithPiece;

window.onload = function(){
    // initialize puzzle board
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < cols; c++){
            // create piece using img tag
            let piece = document.createElement('img');
            piece.src = "images/empty.jpg";

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

    // set up a pieces holder
    let pieces = [];
    for (let i = 1; i <= rows*cols; i++){
        pieces.push(i.toString());
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
    if (draggedPiece.src.includes("empty")) {
        return;
    }

    // swap the empty piece and selected piece
    let currImg = draggedPiece.src;
    let otherImg = swapWithPiece.src;
    draggedPiece.src = otherImg;
    swapWithPiece.src = currImg;
}