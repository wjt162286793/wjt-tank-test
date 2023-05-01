function drawFlags(flagsList, range, observer) {
    flagList.forEach((item, index) => {
        let flag = document.createElement("div");
        flag.className = "flag";
        flag.style.width = item.width + "px";
        flag.style.height = item.height + "px";
        // flag.style.backgroundColor = item.color;
        flag.style.background = 'url(./assets/enemyBottom.png)'
        flag.style.backgroundRepeat = 'no-repeat';
        // flag.style.backgroundPosition = '0 -55px'
        // flag.style.borderRadius = "50%";
        flag.style.position = "absolute";
        flag.style.left = item.xPosition + "px";
        flag.style.bottom = item.yPosition + "px";
        flag.classList.add("flag" + item.id);
        flag.classList.add('barrier')
        flag.setAttribute('tankdirecation', 40)
        flagsList.push({
            left: parseInt(flag.style.left),
            bottom: parseInt(flag.style.bottom),
            top: parseInt(flag.style.bottom) + 50,
            right: parseInt(flag.style.left) + 50,
            className: "flag" + item.id,
        });
        range.appendChild(flag);
        observer.observe(flag, {
            attributes: true,
            attributeFilter: ["style"],
        });
    });
}

function drawBricks(range, observer) {
    console.log(brickList, '砖头列表')
    brickList.forEach((item, index) => {
        let brick = document.createElement('img')
        brick.className = 'brick'
        brick.style.width = '50px'
        brick.style.height = '50px'
        brick.src = './assets/brick.gif'
        brick.style.background = 'blue'
        brick.style.left = item.left + 'px'
        brick.style.bottom = item.bottom + 'px'
        brick.classList.add('brick' + index)
        brick.classList.add('barrier')
        range.appendChild(brick);
        observer.observe(brick, {
            attributes: true,
            attributeFilter: ["style"],
        });
    })
}