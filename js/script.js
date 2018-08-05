var space = 480;
var division = 16;
var paintColor = '#000000';

const container = document.querySelector('#container');
container.style.width = space + 'px';
container.style.height = space + 'px';

/* HELPERS */

function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/* */

function etch(){
    for(let j=0; j<division*division; j++){
        const div = document.createElement('div');
        div.classList.add('grid');
        div.style.width = space/division + 'px';
        div.style.height = space/division + 'px';
        container.appendChild(div);
        div.style.background = '#fff';
    }

    const divs = document.querySelectorAll('.grid');
    divs.forEach(div => div.addEventListener('mouseover', paint));
}

function clean(){
    const divs = document.querySelectorAll('.grid');
    divs.forEach(div => div.style.background = '#ffffff');
}

function resize(){
    clean();
    division = prompt('Squares per side');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    etch();
}

function watchColorPicker(e) {
    paintColor = e.target.value;
}

function paint(e){

    if(e.target.style.background =='rgb(255, 255, 255)')
        e.target.style.background = paintColor;
    else{
        let style = window.getComputedStyle(e.target);
        let color = style.getPropertyValue('background-color');
        color = rgb2hex(color);
        e.target.style.background = shade(color);
        console.log(rgb2hex(e.target.style.background));
    }
        
}

// from css-tricks
function shade(color, percent = -25) {
  
    var usePound = false;
  
    if (color[0] == "#") {
        color = color.slice(1);
        usePound = true;
    }
 
    var num = parseInt(color, 16);
 
    var r = (num >> 16) + percent;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + percent;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + percent;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

etch();

const clear = document.querySelector('#clear');
clear.addEventListener('click', clean);

const size = document.querySelector('#size');
size.addEventListener('click', resize);

const color = document.querySelector('#color');
color.addEventListener('input', watchColorPicker);

