var space = 480;
var division = 16;
var paintColor = '#000000';
var percent = 25;
var lightorshade = true;

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
    temp = prompt('Squares per side');

    if(temp > 0)
        division = temp;
    else
        alert('Needs to be a number, bigger than 0');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    etch();
}

function watchColorPicker(e) {
    paintColor = e.target.value;
}

function paint(e){

    if(e.target.style.backgroundColor =='rgb(255, 255, 255)' && paintColor == '#000000')
        e.target.style.backgroundColor = shade('#ffffff', percent);
    else if(e.target.style.backgroundColor =='rgb(255, 255, 255)')
        e.target.style.backgroundColor = paintColor;
    else{
        let style = window.getComputedStyle(e.target);
        let color = style.getPropertyValue('background-color');
        color = rgb2hex(color);
        e.target.style.backgroundColor = shade(color, percent);
    }
        
}

// from css-tricks
function shade(color, percent) {
    
    if(lightorshade)
        percent = -percent;

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

function changePercent(){
    percent = this.value;
}

function changeShade(){
    (lightorshade) ? lightorshade = false : lightorshade = true;
}

etch();

const clear = document.querySelector('#clear');
clear.addEventListener('click', clean);

const size = document.querySelector('#size');
size.addEventListener('click', resize);

const color = document.querySelector('#color');
color.addEventListener('input', watchColorPicker);

const slider = document.querySelector('#myRange');
slider.addEventListener('input', changePercent);

const adjust = document.querySelector('#adjust');
adjust.addEventListener('click', changeShade);



