//坦克移动事件
import { my } from './index'
document.addEventListener("keydown", keyDown);

function keyDown(event) {
    switch (event.keyCode) {
        case 37:
            if (parseInt(my.style.left) >= 210) {
                my.style.left = parseInt(my.style.left) - 10 + "px";
            }
            break;
        case 39:
            if (parseInt(my.style.left) <= 945) {
                my.style.left = parseInt(my.style.left) + 10 + "px";
            }
            break;
    }
}

