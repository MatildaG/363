// Item Class
class Item {
    constructor(element, correctBin, cleaned) {
        this.element = element;
        this.correctBin = correctBin;
        this.cleaned = cleaned;
    }
}

const offsetLeft = 47;
const offsetTop = 557;


//Array of image references
//0 = image reference, 1 = correct bin, 2 = cleaned/not, 3 = trash type, 4 = max-width
let rubbishArray = [
    ["Images/rubbish.png", "rubbishBin", 1, "Rubbish", 70],
    ["Images/plastic.png", "recycleBin", 1, "Plastic", 70],
    ["Images/bananaPeel.png", "foodScrapBin", 1, "Food Scrap", 70],
    ["Images/glassBottleClean.png", "glassBin", 1, "Glass", 30],
    ["Images/rubbish.png", "rubbishBin", 1, "Rubbish", 70]
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
function generateNewRubbish() {
    document.getElementById("nextButton").hidden = true;

    //Loop through 5x to add new rubbish items
    let itemsDiv = document.getElementById("items");
    let items = [];
    counter = 5;

    let rubbishPlacement = 0;

    for (let i = 0; i < 5; i++) {
        let j = Math.floor(Math.random() * 5);;

        //Create rubbish div
        let elementDiv = document.createElement("div");
        // elementDiv.setAttribute("id", "rubbishDiv" + i);
        elementDiv.setAttribute("class", "rubbishDivClass");

        let rubbishPiece = document.createElement("img");
        rubbishPiece.setAttribute("src", rubbishArray[j][0]);
        rubbishPiece.setAttribute("id", "rubbishPiece" + i);
        rubbishPiece.setAttribute("class", "rubbishClass");
        rubbishPiece.setAttribute("alt", rubbishArray[j][3]);

        elementDiv.style.left = rubbishPlacement + "%";
        rubbishPiece.style.maxWidth = rubbishArray[j][4] + "px";

        //Add to the DOM
        elementDiv.appendChild(rubbishPiece);

        itemsDiv.appendChild(elementDiv);
        items[i] = new Item(elementDiv, rubbishArray[j][1], rubbishArray[j][2]);

        // Adjusts the spacing of items based on items max-width
        rubbishPlacement += (rubbishArray[j][4] / 3);
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
        if (checkClean) {
            item.cleaned = 1;
            alert("cleaned");
        }
        else {
            let check = isInsideBin(item);

            if (check) {
                //Check item is washed 
                if (item.cleaned == 0) {
                    alert("Not Clean");
                }
                else {
                    element.style.display = "none";
                    points++;
                    counter--;
                    //Check if there are any more elements on the page
                    if (counter == 0) {
                        document.getElementById("nextButton").hidden = false;
                        alert("visible");
                    }
                    else {
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
    //Need to add offsets since otherwise it is relative to the top left of items
    let itemOffsetTop = element.offsetTop + offsetTop;
    let itemOffsetLeft = offsetLeft + element.offsetLeft;
    // alert(itemOffsetLeft + "," + itemOffsetTop);
    for (let i = 0; i < bins.length; i++) {
        // alert(bins[i].offsetLeft + "," + bins[i].offsetTop);
        if (itemOffsetTop >= bins[i].offsetTop &&
            (itemOffsetTop + element.offsetHeight) <= (bins[i].offsetTop + bins[i].offsetHeight) &&
            itemOffsetLeft >= bins[i].offsetLeft &&
            (itemOffsetLeft + element.offsetWidth) <= (bins[i].offsetLeft + bins[i].offsetWidth)) {
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
    //Need to add offsets since otherwise it is relative to the top left of items
    let itemOffsetTop = element.offsetTop + offsetTop;
    let itemOffsetLeft = element.offsetLeft + offsetLeft;

    if (itemOffsetTop >= waterBucket.offsetTop &&
        (itemOffsetTop + element.offsetHeight) <= (waterBucket.offsetTop + waterBucket.offsetHeight) &&
        itemOffsetLeft >= waterBucket.offsetLeft &&
        (itemOffsetLeft + element.offsetWidth) <= (waterBucket.offsetLeft + waterBucket.offsetWidth)) {
        return true;
    }
    return false;
}

/**
 * openInfoPage - Hides the game and opens info page allowing user to 
 * return directly to the game
 */
function openInfoPage() {
    document.getElementById("containerGame").hidden = true;
    document.getElementById("containerInfo").hidden = false;
}

/**
 * returnToGame - Hides the info and opens game page.
 */
function returnToGame() {
    document.getElementById("containerInfo").hidden = true;
    document.getElementById("containerGame").hidden = false;
}