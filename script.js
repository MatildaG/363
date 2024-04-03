// Item Class
class Item {
    constructor(element, correctBin, cleaned) {
        this.element = element;
        this.correctBin = correctBin;
        this.cleaned = cleaned;
    }
}

// Array of bins
let bins = [
    document.getElementById("rubbishBin"),
    document.getElementById("recycleBin"),
    document.getElementById("glassBin"),
    document.getElementById("foodScrapBin")
];

// Items array
let items = [
    new Item(document.getElementById("rubbish"), "rubbishBin", 1),
    new Item(document.getElementById("plastic"), "recycleBin", 1)
];

// Users points
let points = 0;

// Creates a drag function for each item
items.forEach(dragElement);

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
        let check = isInsideBin(item);

        if (check) {
            element.style.display = "none";
            points++;
        } else if (check === false) {
            alert("Wrong Bin");
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
