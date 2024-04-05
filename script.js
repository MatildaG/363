// Item Class
class Item {
    constructor(element, correctBin, cleaned) {
        this.element = element;
        this.correctBin = correctBin;
        this.cleaned = cleaned;
    }
}   


//Array of image references
//0 = image reference, 1 = correct bin, 2 = cleaned/not, 3 = trash type, 4 = recyclable/not
let rubbishArray = [
    ["Images/rubbish.png", "rubbishBin", 1, "Rubbish"],
    ["Images/plastic.png", "recycleBin", 1, "Plastic"],
    ["Images/rubbish.png", "rubbishBin", 1, "Rubbish"],
    ["Images/plastic.png", "recycleBin", 1, "Plastic"],
    ["Images/rubbish.png", "rubbishBin", 1, "Rubbish"]
];

// Array of bins
let bins = [
    document.getElementById("rubbishBin"),
    document.getElementById("recycleBin"),
    document.getElementById("glassBin"),
    document.getElementById("foodScrapBin")
];

//Water bucket
let waterBucket = document.getElementById("waterBucket");

// Users points
let points = 0;

//Counter for how many trash items are currently displayed
let counter = 0;

/**
 * generateNewRubbish - This function is called onload and on nextButton click 
 * and it creates 5 new trash items adding to DOM
 */
//Function called onload and on nextButton click which creates 5 new trash items
function generateNewRubbish(){
    document.getElementById("nextButton").hidden = true;

    //Loop through 5x to add new rubbish items
    let itemsDiv = document.getElementById("items");
    let items = [];
    counter = 5;
    for(let i = 0; i < 5; i++){
        //Create rubbish div
        let elementDiv = document.createElement("div");
        elementDiv.setAttribute("id", "rubbishDiv" + i);
        let rubbishPiece = document.createElement("img");
        rubbishPiece.setAttribute("src", rubbishArray[i][0]);
        rubbishPiece.setAttribute("width", "70px");
        rubbishPiece.setAttribute("id", "rubbishPiece" + i);
        rubbishPiece.setAttribute("class", "rubbishClass");
        rubbishPiece.setAttribute("alt", rubbishArray[i][3]);

        //Add to the DOM
        elementDiv.appendChild(rubbishPiece);
        itemsDiv.appendChild(elementDiv);
        items[i] = new Item(elementDiv, rubbishArray[i][1], rubbishArray[i][2]);
    }
    // Creates a drag function for each item
    items.forEach(dragElement);
}

/**
 * dragElement - This function allows an item to be dragged, 
 * simulating throwing it out. Adpated from W3Schools.
 * @param {object} item - The item object representing the 
 * rubbish, recycling, etc.
 */
function dragElement(item) {
    let element = item.element;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    /**
     * dragMouseDown - Gets the elements current position and 
     * sets up event listeners for mousemove and mouseup
     * @param {*} e - The element of we have selected 
     */
    function dragMouseDown(e) {
        e = e || window;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    /**
     * elementDrag - Continuously updates the position of the 
     * while dragged.
     * @param {*} e - The element of being dragged
     */
    function elementDrag(e) {
        e = e || window;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    /**
     * closeDragElement - Deselects the element and checks if
     * placed in a bin (if so, check if the bin is correct).
     */
    function closeDragElement() {
        //Event that item is in a bucket
        let checkClean = isInWaterBucket(item);
        if(checkClean){
            item.cleaned = 1;
            alert("cleaned");
        }
        else{
            let check = isInsideBin(item);

            if (check) {
                //Check item is washed 
                if(item.cleaned == 0){
                    alert("Not Clean");
                }
                else{
                    element.style.display = "none";
                    points++;
                    counter--;
                    //Check if there are any more elements on the page
                    if(counter == 0){
                        document.getElementById("nextButton").hidden = false; 
                        alert("visible");
                    }
                    else{
                        document.getElementById("nextButton").hidden = true; 
                    }
                }
            } else if (check === false) {
                alert("Wrong Bin");
            }
        }

        document.onmouseup = null;
        document.onmousemove = null;

        document.getElementById("score").innerHTML = points;
    }
}

/**
 * isInsideBin - Checks if an item is placed inside a bin.
 * @param {Item} item - The item we are checking if has been 
 * placed in a bin.
 */
function isInsideBin(item) {
    let element = item.element;
    let correctBin = item.correctBin;

    for (let i = 0; i < bins.length; i++) {
        if (element.offsetTop >= bins[i].offsetTop &&
            (element.offsetTop + element.offsetHeight) <= (bins[i].offsetTop + bins[i].offsetHeight) &&
            element.offsetLeft >= bins[i].offsetLeft &&
            (element.offsetLeft + element.offsetWidth) <= (bins[i].offsetLeft + bins[i].offsetWidth)) {
            if (bins[i].id === correctBin) {
                return true;
            } else {
                return false;
            }
        }
    }

    return null;
}

/**
 * isInWaterBucket - Checks if an item is placed inside the wash bucket.
 * @param {Item} item - The item we are checking if has been 
 * placed in the wash bucket.
 */
function isInWaterBucket(item) {
    let element = item.element;
    if (element.offsetTop >= waterBucket.offsetTop &&
        (element.offsetTop + element.offsetHeight) <= (waterBucket.offsetTop + waterBucket.offsetHeight) &&
        element.offsetLeft >= waterBucket.offsetLeft &&
        (element.offsetLeft + element.offsetWidth) <= (waterBucket.offsetLeft + waterBucket.offsetWidth)) {
        return true;
    }
    return false;
}