import { bulletList } from './index'

let my = document.querySelector('.my')
//创建子弹事件
document.addEventListener("keyup", throttle(keyUp, 100));
function keyUp(event) {
    switch (event.keyCode) {
        case 32:
            createBullet();
    }
}
//子弹发射
function createBullet() {
    let xVal = my.style.left;
    let bullet = document.createElement("div");
    bullet.style.position = "absolute";
    bullet.style.left = parseInt(xVal) - 176 + "px";
    bullet.style.top = "350px";
    bullet.style.background = "blue";
    bullet.style.width = "5px";
    bullet.style.height = "5px";
    bullet.style.borderRadius = "50%";
    bullet.getAttribute("type", "bullte");
    bullet.className = "bullte";
    let str = "bullet" + Date.now();
    bulletList.push(str);
    bullet.classList.add(str);
    range.appendChild(bullet);
    observer.observe(bullet, {
        attributes: true,
        attributeFilter: ["style"],
    });
    window[str] = setInterval(() => {
        bullet.style.top = parseInt(bullet.style.top) - 10 + "px";
    }, 50);
}
