var space = 480;
var division = 16;
var paintColor = '#000';

const container = document.querySelector('#container');
container.style.width = space + 'px';
container.style.height = space + 'px';

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
    divs.forEach(div => div.style.background = '#fff');
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
    e.target.style.background = paintColor;
}

etch();

const clear = document.querySelector('#clear');
clear.addEventListener('click', clean);

const size = document.querySelector('#size');
size.addEventListener('click', resize);

const color = document.querySelector('#color');
color.addEventListener('input', watchColorPicker);

