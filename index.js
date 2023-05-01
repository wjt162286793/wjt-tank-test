//获取初始节点和数据
window.onload = function () {
    const main = document.querySelector(".main");
    const range = document.querySelector(".range");
    const startBtn = document.querySelector(".startBtn");
    const my = document.querySelector(".my");
    const home = document.querySelector(".home")
    let startFlag = false
    let flagsList = new Array();
    let bulletList = new Array();
    let beHitlist = new Array()
    let direction = null
    let mydirecttion = 38
    let cantake = false

    let observer = null
    new MutationObserver(callback);
    //运动逻辑
    function callback(mutationsList, ovserve) {
        mutationsList.forEach((mutation, index) => {
            if (mutation.type === "attributes") {
                if (mutation.target.className.includes("bullet")) {
                    let allFlags = Array.from(document.querySelectorAll('.flag'))
                    let allBricks = Array.from(document.querySelectorAll('.brick'))
                    let allbarrier = Array.from(document.querySelectorAll('.barrier'))
                    let deleteFlag = null
                    allbarrier.forEach((item, index) => {
                        if ((parseInt(mutation.target.style.left) >= parseInt(item.style.left)) && (parseInt(mutation.target.style.left) <= (parseInt(item.style.left) + 50)) && (parseInt(mutation.target.style.bottom) >= parseInt(item.style.bottom)) && (parseInt(mutation.target.style.bottom) <= parseInt(item.style.bottom) + 50)) {
                            if (item.className.includes('flag')) {
                                beHitfun(item, mutation, allFlags)
                            }
                            else if (item.className.includes('brick')) {
                                console.log(item.style.left, item.style.bottom, '位置')
                                beHitfun(item, mutation, allBricks)
                            } else if (item.className.includes('home')) {
                                console.log('没击中???')
                                startFlag = false
                                beHitfun(item, mutation, null)
                                // alert('老家被拆,游戏失败')
                                // document.location.reload();
                            }
                        }
                    })
                    //子弹碰触墙壁
                    if ((mutation.target.style.bottom === "400px" && mutation.target.getAttribute("direction") === 'top') || (mutation.target.style.left === "0px" && mutation.target.getAttribute("direction") === 'left') || (mutation.target.style.left === "800px" && mutation.target.getAttribute("direction") === 'right') || (mutation.target.style.bottom === "0px" && mutation.target.getAttribute("direction") === 'bottom')) {
                        console.log(mutation.target.getAttribute("direction"), 'shenme>??')
                        mutation.target.remove();
                        let topBullet = mutation.target.className.slice(7)
                        bulletList.splice(bulletList.findIndex(item => item === topBullet), 1)
                        clearInterval(window[topBullet]);
                        judge(allFlags, bulletList)
                    }
                }
            }
        });
    }
    //游戏开始,绘制元素
    startBtn.onclick = start;
    function start() {
        observer = new MutationObserver(callback);
        startBtn.style.display = "none";
        startFlag = true
        my.style.display = 'block'
        my.style.left = '280px'
        my.style.bottom = '0px'
        writeDirection(38)
        home.style.display = 'block'
        home.src = './assets/home.gif'
        home.classList.add('barrier')
        observer.observe(my, {
            attributes: true,
            attributeFilter: ["style"],
        });
        drawFlags(flagsList, range, observer)
        drawBricks(range, observer)
        // window.enemySetinner = setInterval(() => {
        //     enemyPlay()
        // }, 3000);

    }

    //坦克移动事件
    document.addEventListener("keydown", keyDown);
    function keyDown(event) {
        if (startFlag === false) {
            return
        }
        event.preventDefault()
        let barrirList = Array.from(document.querySelectorAll('.barrier'))
        direction = event.keyCode
        if (event.keyCode !== mydirecttion && event.keyCode !== 32) {
            writeDirection(event.keyCode)
        }
        switch (event.keyCode) {
            //←
            case 37:
                if (parseInt(my.style.left) >= 0 && (cantake === false || direction !== 37)) {
                    my.style.left = parseInt(my.style.left) - 10 + "px";
                }
                break;
            //→
            case 39:
                if (parseInt(my.style.left) <= 750 && (cantake === false || direction !== 39)) {
                    my.style.left = parseInt(my.style.left) + 10 + "px";
                }
                break;
            //↑
            case 38:

                if (parseInt(my.style.bottom) <= 350 && (cantake === false || direction !== 38)) {
                    my.style.bottom = parseInt(my.style.bottom) + 10 + "px";
                }
                break;
            //↓
            case 40:

                if (parseInt(my.style.bottom) >= 0 && (cantake === false || direction !== 40)) {
                    my.style.bottom = parseInt(my.style.bottom) - 10 + "px";
                }
                break;
        }
        filterFlag(event.keyCode, barrirList, my, direction)

    }
    // function enemyPlay() {
    //     let barrirList = Array.from(document.querySelectorAll('.barrier'))
    //     let allFlags = Array.from(document.querySelectorAll('.flag'))
    //     allFlags.forEach(item => {
    //         // window[item.classList[1]] = setInterval(() => {
    //         //     let number = Math.floor(Math.random() * (5 - 1 + 1)) + 1
    //         //     console.log(item.src, '适合呢嘛')
    //         //     // filterFlag(null, barrirList, item)
    //         // }, 100);
    //         window[item.classList[1]] = null
    //         let directionFlag = null
    //         let number = Math.floor(Math.random() * (41 - 37 + 1) + 37)
    //         // if(number === 1){
    //         window[item.classList[1]] = setInterval(() => {
    //             directionFlag = number
    //             if (number !== 41) {
    //                 filterFlag(null, barrirList, item, directionFlag)
    //             }
    //             enemyDone(number, item)
    //             // item.style.background = 'url(./assets/enemyBottom.png)'
    //             // item.style.bottom = parseInt(item.style.bottom) - 10 + 'px'
    //         }, 500);
    //         // }
    //     })
    // }
    // function enemyDone(number, item) {
    //     console.log(number, '多少')
    //     if (number === 40) {
    //         item.style.background = 'url(./assets/enemyBottom.png)'
    //         item.style.bottom = parseInt(item.style.bottom) - 10 + 'px'
    //     } else if (number === 38) {
    //         item.style.background = 'url(./assets/enemyTop.png)'
    //         item.style.bottom = parseInt(item.style.bottom) + 10 + 'px'
    //     }
    //     else if (number === 39) {
    //         item.style.background = 'url(./assets/enemyRight.png)'
    //         item.style.left = parseInt(item.style.left) + 10 + 'px'
    //     }
    //     else if (number === 37) {
    //         item.style.background = 'url(./assets/enemyLeft.png)'
    //         item.style.left = parseInt(item.style.left) - 10 + 'px'
    //     }
    //     else if (number === 41) {
    //         createBullet(item)
    //     }
    // }
    //坦克行走碰撞
    let filterFlag = function (val, barrirList, tank, directionFlag) {
        if (startFlag === false) {
            return
        }
        let filterList = []
        barrirList.forEach(item => {
            // console.log(item, '几个在走')
            if (tank.className !== item.className) {
                // console.log('让我看有几个???')
                let tankLeft = parseInt(tank.style.left)
                let tankBottom = parseInt(tank.style.bottom)
                let flagLeft = parseInt(item.style.left)
                let flagBottom = parseInt(item.style.bottom)

                let Left = tankLeft + 50 <= flagLeft
                let Top = tankBottom >= flagBottom + 50
                let Right = tankLeft >= flagLeft + 50
                let Bottom = tankBottom + 50 <= flagBottom

                if ((Left || Right || Top || Bottom)) {
                    // console.log('进这个了???')
                    filterList.push(false)
                    if (parseInt(tank.style.left) < 0) {
                        tank.style.left = '0px'
                    }
                    if (parseInt(tank.style.bottom) > 350) {
                        tank.style.bottom = '350px'
                    }
                    if (parseInt(tank.style.left) > 750) {
                        tank.style.left = '750px'
                    }
                    if (parseInt(tank.style.bottom) < 0) {
                        tank.style.bottom = '0px'
                    }
                } else {
                    // if (val !== null) {
                    filterList.push(true)
                    if (directionFlag === 37) {
                        tank.style.left = parseInt(tank.style.left) + 10 + 'px'
                    } else if (directionFlag === 38) {
                        tank.style.bottom = parseInt(tank.style.bottom) - 10 + 'px'
                    } else if (directionFlag === 39) {
                        tank.style.left = parseInt(tank.style.left) - 10 + 'px'
                    } else if (directionFlag === 40) {
                        tank.style.bottom = parseInt(tank.style.bottom) + 10 + 'px'
                    }
                }
            }

            // }
        })
        cantake = filterList.some(v => v === true)
    }

    //转向
    function writeDirection(code) {
        if (startFlag === false) {
            return
        }
        mydirecttion = code
        switch (code) {
            case 37:
                my.src = './assets/myLeft.png'
                break;
            case 39:
                my.src = './assets/myRight.png'
                break;
            case 38:
                my.src = './assets/myTop.png'
                break;
            case 40:
                my.src = './assets/myBottom.png'
                break;
        }
    }
    //创建子弹事件
    document.addEventListener("keyup", throttle(keyUp, 100));
    function keyUp(event) {
        if (startFlag === false) {
            return
        }
        switch (event.keyCode) {
            case 32:
                createBullet(my);
        }
    }
    //子弹发射
    function createBullet(tank) {
        if (startFlag === false) {
            return
        }
        let xVal = tank.style.left;
        let yVal = tank.style.bottom;
        console.log(tank.style.left, tank.style.bottom, '创建子弹位置')
        // console.log(xVal, yVal, '坦克位置')
        let bullet = document.createElement("div");
        bullet.style.position = "absolute";
        bullet.style.background = "blue";
        bullet.style.width = "5px";
        bullet.style.height = "5px";
        bullet.style.borderRadius = "50%";
        bullet.className = "bullte";
        let str = "bullet" + Date.now();
        bulletList.push(str);
        bullet.classList.add(str);
        range.appendChild(bullet);
        console.log(mydirecttion, '朝向')
        switch (mydirecttion) {
            case 38:
                bullet.setAttribute("direction", "top");
                bullet.style.left = parseInt(xVal) + 25 + "px";
                bullet.style.bottom = parseInt(yVal) + 50 + "px";
                window[str] = setInterval(() => {
                    bullet.style.bottom = parseInt(bullet.style.bottom) + 1 + "px";
                });
                break;
            case 37:
                bullet.setAttribute("direction", "left");
                bullet.style.left = parseInt(xVal) + "px";
                bullet.style.bottom = parseInt(yVal) + 25 + "px";
                window[str] = setInterval(() => {
                    bullet.style.left = parseInt(bullet.style.left) - 1 + "px";
                });
                break;
            case 39:
                bullet.setAttribute("direction", "right");
                bullet.style.left = parseInt(xVal) + 50 + "px";
                bullet.style.bottom = parseInt(yVal) + 25 + "px";
                window[str] = setInterval(() => {
                    bullet.style.left = parseInt(bullet.style.left) + 1 + "px";
                });
                break;
            case 40:
                bullet.setAttribute("direction", "bottom");
                bullet.style.left = parseInt(xVal) + 25 + "px";
                bullet.style.bottom = parseInt(yVal) + "px";
                window[str] = setInterval(() => {
                    bullet.style.bottom = parseInt(bullet.style.bottom) - 1 + "px";
                });
                break;

        }
        observer.observe(bullet, {
            attributes: true,
            attributeFilter: ["style"],
        });

    }
    //子弹击中障碍物判定
    function beHitfun(item, mutation, list) {
        let explode = document.createElement('div')
        explode.className = 'explode'
        explode.style.left = item.style.left
        explode.style.bottom = item.style.bottom
        setTimeout(() => {
            explode.remove()
        }, 100)
        range.appendChild(explode);
        mutation.target.remove()
        bulletList.splice(bulletList.findIndex(item => item === mutation.target.className.slice(7)), 1)
        if (item.className.includes('flag')) {
            console.log(item.style.left, item.style.bottom, mutation.target.style.left, mutation.target.style.bottom, '子弹位置和敌方坦克位置')
            console.log(list, item.className.slice(5), '什么???==')
            console.log(list.findIndex(Val => Val.className.includes(item.className.slice(5))), '几号?')
            list.splice(list.findIndex(Val => Val.className.includes(item.className.slice(5))), 1)
            clearInterval(window[mutation.target.className.slice(7)])
            judge(list, bulletList)
        } else if (item.className.includes('brick')) {
            list.splice(list.findIndex(Val => Val.className.includes(item.className.slice(6))), 1)
            clearInterval(window[mutation.target.className.slice(7)])

        } else if (item.className.includes('home')) {
            observer.disconnect();
            home.src = './assets/end.png'
            setTimeout(() => {
                alert('游戏结束')
                startBtn.style.display = 'block'
                startBtn.innerText = '重新开始'
            }, 1000)
            return
        }
        let hitTarget = document.getElementsByClassName(`${item.className}`)
        if (hitTarget.length > 0) {
            hitTarget[0].style.display = 'none'
            hitTarget[0].remove()
            deleteFlag = item.className
            beHitlist.push(item.className)
        }
    }

    //判断游戏结束
    function judge(allFlags, bulletList) {
        console.log(allFlags, bulletList, '判断列表')
        if (allFlags.length <= 0 && bulletList.length <= 0) {
            observer.disconnect();
            startFlag = false
            setTimeout(() => {
                alert('你胜利了')
                startBtn.style.display = 'block'
                startBtn.innerText = '重新开始'
            }, 500)
        }
    }

}
