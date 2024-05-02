// Item Class
class Item {
    constructor(element, correctBin, cleaned, lidOff) {
        this.element = element;
        this.correctBin = correctBin;
        this.cleaned = cleaned;
        this.lidOff = lidOff;
    }
}

const offsetLeft = 47;

//Array of image references
//0 = image reference, 1 = correct bin, 2 = clean 3 = lidoff,
//4 = trash type, 5 = max-width
const rubbishArray = [
    ["Images/rubbish.png", "rubbishBin", 1, 1, "Rubbish", 70],
    ["Images/plastic1.png", "recycleBin", 1, 1, "Plastic", 70],
    ["Images/plastic1Lid.png", "recycleBin", 1, 0, "Plastic", 70],    
    ["Images/plastic2.png", "recycleBin", 1, 1, "Plastic", 70],
    ["Images/plastic2Lid.png", "recycleBin", 1, 0, "Plastic", 70],        
    ["Images/plastic3.png", "rubbishBin", 1, 1, "Plastic", 70],
    ["Images/plastic4.png", "rubbishBin", 1, 1, "Plastic", 70],
    ["Images/plastic5.png", "recycleBin", 1, 1, "Plastic", 70],
    ["Images/plastic5Lid.png", "recycleBin", 1, 0, "Plastic", 70],    
    ["Images/plastic6.png", "rubbishBin", 1, 1, "Plastic", 70],
    ["Images/plastic7.png", "rubbishBin", 1, 1, "Plastic", 70],
    ["Images/bananaPeel.png", "foodScrapBin", 1, 1, "Food Scrap", 70],
    ["Images/glassBottleClean.png", "glassBin", 1, 1, "Glass", 30],
    ["Images/glassBottleDirty.png", "glassBin", 0, 1, "Glass", 30],
    ["Images/glassBottleCleanLid.png", "glassBin", 1, 0, "Glass", 30],
    ["Images/glassBottleDirtyLid.png", "glassBin", 0, 0, "Glass", 30],
    ["Images/rubbish.png", "rubbishBin", 1, 1, "Rubbish", 70],
    ["Images/rottonBread.png", "foodScrapBin", 1, 1, "Food Scrap", 70],
    ["Images/flowers.png", "foodScrapBin", 1, 1, "Food Scrap", 70],
    ["Images/eggShells.png", "foodScrapBin", 1, 1, "Food Scrap", 70],
    ["Images/fishBones.png", "foodScrapBin", 1, 1, "Food Scrap", 70],
    ["Images/teaBag.png", "foodScrapBin", 1, 1, "Food Scrap", 70],
    ["Images/paperTowel.png", "foodScrapBin", 1, 1, "Food Scrap", 70],
    ["Images/bodySpray.png", "rubbishBin", 1, 1, "Rubbish", 40],
    ["Images/yoghurtContainer.png", "rubbishBin", 1, 1, "Rubbish", 70],
    ["Images/pizzaBox.png", "recycleBin", 1, 1, "Recycle", 70]
];

// Array of bins
// 0 = DOM element,  1 = offsetTop
const bins = [
    [document.getElementById("rubbishBin"), 510],
    [document.getElementById("recycleBin"), 500],
    [document.getElementById("glassBin"), 520],
    [document.getElementById("foodScrapBin"), 490]
];

//Water bucket and lid remover
let waterBucket = document.getElementById("waterBucket");
let lidRemover = document.getElementById("lidRemover");

// Users points & counter for how many trash items are currently displayed
let points = 0, counter = 0;

/**
 * generateNewRubbish - This function is called onload and on nextButton click 
 * and it creates 5 new trash items adding to DOM
 */
//Function called onload and on nextButton click which creates 5 new trash items
function generateNewRubbish() {
    counter = 0;
    document.getElementById("nextButton").hidden = true;

    //Loop through 5x to add new rubbish items
    let itemsDiv = document.getElementById("items");
    itemsDiv.innerHTML = ""; // Need to clear div each time additional round is played
    let items = [];

    let containerWidth = document.getElementById("items").offsetWidth;
    counter = Math.floor(containerWidth / 100); // Adjust 200 based on your design

    console.log(counter);

    let rubbishPlacement = 0;

    for (let i = 0; i < counter; i++) {
        let j = Math.floor(Math.random() * rubbishArray.length);;

        //Create rubbish div
        let elementDiv = document.createElement("div");
        elementDiv.setAttribute("class", "rubbishDivClass");


        let rubbishPiece = document.createElement("img");
        rubbishPiece.setAttribute("src", rubbishArray[j][0]);
        rubbishPiece.setAttribute("id", "rubbishPiece" + i);
        rubbishPiece.setAttribute("class", "rubbishClass");
        rubbishPiece.setAttribute("alt", rubbishArray[j][4]);

        elementDiv.style.left = rubbishPlacement + "%";
        rubbishPiece.style.maxWidth = rubbishArray[j][5] + "px";

        //Add to the DOM
        elementDiv.appendChild(rubbishPiece);

        itemsDiv.appendChild(elementDiv);
        items[i] = new Item(elementDiv, rubbishArray[j][1], rubbishArray[j][2], rubbishArray[j][3]);

        // Adjusts the spacing of items based on items max-width
        rubbishPlacement += (rubbishArray[j][5] / 3);
        positionElements();
    }

    // Creates a drag function for each item
    items.forEach(dragElement);

    // Spaces out elements evenly
    function positionElements() {
        let itemsDiv = document.getElementById("items");
        let items = itemsDiv.getElementsByClassName("rubbishDivClass");
    
        let containerWidth = itemsDiv.offsetWidth;
        let numItems = items.length;
        let itemWidth = 100;
        let gap = (containerWidth - (numItems * itemWidth)) / (numItems - 1);
    
        let leftPosition = 0;
        for (let i = 0; i < numItems; i++) {
            items[i].style.left = leftPosition + "px";
            leftPosition += itemWidth + gap;
        }
    }
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

        let div = document.getElementById("containerGame");

        //Retrieve div borders
        let width = screen.availWidth;
        let boxLeft = (width - div.offsetWidth) / 2 + (element.offsetWidth / 2);
        let boxRight = width - (width - div.offsetWidth) / 2 - element.offsetWidth / 2;
        let boxTop = (element.offsetHeight / 2);
        let boxBottom = screen.availHeight - (element.offsetHeight * 2);
        
        //Check that mouse is in X bounds
        if(e.clientX > boxLeft && e.clientX < boxRight){
            pos1 = pos3 - e.clientX;
            pos3 = e.clientX;
        }
        else if(e.clientX <= boxLeft){
            pos1 = pos3 - boxLeft;
            pos3 = boxLeft;
        }
        else{
            pos1 = pos3 - boxRight;
            pos3 = boxRight;   
        }
        
        //Check that mouse in in Y bounds
        if(e.clientY > boxTop && e.clientY < boxBottom){
            pos2 = pos4 - e.clientY;
            pos4 = e.clientY;
        }
        else if(e.clientY <= boxTop){
            pos2 = pos4 - boxTop;
            pos4 = boxTop;
        }
        else{
            pos2 = pos4 - boxBottom;
            pos4 = boxBottom;   
        }

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
        let checkLid = isInLidRemover(item);

        if (checkClean) {
            item.cleaned = 1;
            let img = element.children[0];
            let src = img.src;
            if(src.includes("DirtyLid")){
                let newSrc = src.substring(0, src.length - 12);
                img.src = newSrc + "CleanLid.png";
                popUpMessage("Item Cleaned!", 1);
            }
            else if(src.includes("Dirty")){
                let newSrc = src.substring(0, src.length - 9);
                img.src = newSrc + "Clean.png";
                popUpMessage("Item Cleaned!", 1);
            }
            else
                popUpMessage("No need to be Cleaned!", 0);

        }
        else if(checkLid){
            item.lidOff = 1;
            let img = element.children[0];
            let src = img.src;
            if(src.includes("Lid")){
                let newSrc = src.substring(0, src.length - 7);
                img.src = newSrc + ".png";
                popUpMessage("Lid Removed!", 1);
            }
            else
                popUpMessage("No Lid to Remove!", 0);

        }
        else {
            let check = isInsideBin(item);

            if (check) {
                //Check item is washed 
                if (item.cleaned == 0 || item.lidOff == 0) {
                    popUpMessage("Check again!\nNot ready to go in yet", 0);
                }
                else {
                    element.style.display = "none";
                    points++;
                    counter--;
                    //Check if there are any more elements on the page
                    if (counter == 0) {
                        document.getElementById("nextButton").hidden = false;
                    }
                    else {
                        document.getElementById("nextButton").hidden = true;
                    }
                }
            } else if (check === false) {
                popUpMessage("Wrong Bin!", 0);
            }
        }

        document.onmouseup = null;
        document.onmousemove = null;

        document.getElementById("score").innerHTML = points;
    }
}

/**
 * popUpMessage - Shows the user a quick message of an event they just did
 * @param {String} message - The message to be displayed
 * @param {number} type - Whether the message should be red or green
 */
function popUpMessage(message, type) {
    let popUp = document.getElementById("popUp");
    let container = document.getElementById("smallContainer");

    if (type === 1) {
        container.style.backgroundColor = "LightGreen";
        container.style.borderColor = "Green";
    } else {
        container.style.backgroundColor = "#FB7878";
        container.style.borderColor = "#FF2115";
    }

    // From: https://www.sitepoint.com/delay-sleep-pause-wait/
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    container.innerHTML = "<p>" + message + "</p>";
    popUp.style.display = "block";
    delay(1000).then(() => { popUp.style.display = "none"; })
}

/**
 * isInsideBin - Checks if an item is placed inside a bin.
 * @param {Item} item - The item we are checking if has been 
 * placed in a bin.
 */
function isInsideBin(item) {
    let element = item.element;
    let correctBin = item.correctBin;

    let expandDistance = 10;

    // Need to add offsets since otherwise it is relative to the top left of items
    for (let i = 0; i < bins.length; i++) {
        let offsetTop = bins[i][1];

        // Calculate expanded boundaries for the bin
        let binTop = bins[i][0].offsetTop - expandDistance;
        let binBottom = bins[i][0].offsetTop + bins[i][0].offsetHeight + expandDistance;
        let binLeft = bins[i][0].offsetLeft - expandDistance;
        let binRight = bins[i][0].offsetLeft + bins[i][0].offsetWidth + expandDistance;

        // Calculate item's boundaries
        let itemTop = element.offsetTop + offsetTop;
        let itemLeft = offsetLeft + element.offsetLeft;

        //Calculate item's middle coords
        let itemMiddleX = itemLeft + (element.offsetWidth / 2);
        let itemMiddleY = itemTop + (element.offsetHeight / 2);

        // Check if the item middle is within the boundaries of the bin
        if (itemMiddleY >= binTop && itemMiddleY <= binBottom &&
            itemMiddleX >= binLeft && itemMiddleX <= binRight) {
            return (bins[i][0].id === correctBin) ? true : false;
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
    let itemOffsetTop = element.offsetTop + 500;
    let itemOffsetLeft = element.offsetLeft + offsetLeft;

    //Calculate middle coords of object
    let itemXMiddle = itemOffsetLeft + (element.offsetWidth / 2);
    let itemYMiddle = itemOffsetTop + (element.offsetHeight / 2);

    // Need to add offsets since otherwise it is relative to the top left of items
    if (itemYMiddle >= waterBucket.offsetTop &&
        itemYMiddle <= waterBucket.offsetTop + waterBucket.offsetHeight &&
        itemXMiddle >= waterBucket.offsetLeft &&
        itemXMiddle <= waterBucket.offsetLeft + waterBucket.offsetWidth) {
        return true;
    }
    return false;
}

/**
 * isInLidRemover - Checks if an item is placed inside the lid remover.
 * @param {Item} item - The item we are checking if has been 
 * placed in the lid remover.
 */
function isInLidRemover(item) {
    let element = item.element;
    let itemOffsetTop = element.offsetTop + 510;
    let itemOffsetLeft = element.offsetLeft + offsetLeft;

    //Calculate middle coords of object
    let itemXMiddle = itemOffsetLeft + (element.offsetWidth / 2);
    let itemYMiddle = itemOffsetTop + (element.offsetHeight / 2);
    

    // Need to add offsets since otherwise it is relative to the top left of items
    if (itemYMiddle >= lidRemover.offsetTop &&
        itemYMiddle <= lidRemover.offsetTop + lidRemover.offsetHeight &&
        itemXMiddle >= lidRemover.offsetLeft &&
        itemXMiddle <= lidRemover.offsetLeft + lidRemover.offsetWidth) {
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