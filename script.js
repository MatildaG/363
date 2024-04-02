let rubbish = document.getElementById("rubbish");
let recycleBin = document.getElementById("recycleBin");
let rubbishBin = document.getElementById("rubbishBin");
let plastic = document.getElementById("plastic");

let points = 0;

dragElement(rubbish);
dragElement(plastic);

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        if (rubbish.offsetTop >= rubbishBin.offsetTop &&
            (rubbish.offsetTop + rubbish.offsetHeight) <= (rubbishBin.offsetTop + rubbishBin.offsetHeight) &&
            rubbish.offsetLeft >= rubbishBin.offsetLeft &&
            (rubbish.offsetLeft + rubbish.offsetWidth) <= (rubbishBin.offsetLeft + rubbishBin.offsetWidth)
        ) {
            rubbish.style.display = "none";
            points++;
        } else if (rubbish.offsetTop >= recycleBin.offsetTop &&
            (rubbish.offsetTop + rubbish.offsetHeight) <= (recycleBin.offsetTop + recycleBin.offsetHeight) &&
            rubbish.offsetLeft >= recycleBin.offsetLeft &&
            (rubbish.offsetLeft + rubbish.offsetWidth) <= (recycleBin.offsetLeft + recycleBin.offsetWidth)
        ) {
            alert("Wrong Bin");
            document.onmouseup = null;
            document.onmousemove = null;
        }


        if (plastic.offsetTop >= recycleBin.offsetTop &&
            (plastic.offsetTop + plastic.offsetHeight) <= (recycleBin.offsetTop + recycleBin.offsetHeight) &&
            plastic.offsetLeft >= recycleBin.offsetLeft &&
            (plastic.offsetLeft + plastic.offsetWidth) <= (recycleBin.offsetLeft + recycleBin.offsetWidth)
        ) {
            plastic.style.display = "none";
            points++;
        } else if (plastic.offsetTop >= rubbishBin.offsetTop &&
            (plastic.offsetTop + plastic.offsetHeight) <= (rubbishBin.offsetTop + rubbishBin.offsetHeight) &&
            plastic.offsetLeft >= rubbishBin.offsetLeft &&
            (plastic.offsetLeft + plastic.offsetWidth) <= (rubbishBin.offsetLeft + rubbishBin.offsetWidth)
        ) {
            alert("Wrong Bin");
            document.onmouseup = null;
            document.onmousemove = null;
        }

        document.onmouseup = null;
        document.onmousemove = null;

        document.getElementById("score").innerHTML = points;
        console.log(points);
    }
}