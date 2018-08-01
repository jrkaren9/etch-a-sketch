const container = document.querySelector('#container');
var space = 512;
var division = 16;

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

etch();

function paint(){
    this.style.background = '#000';
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', clean);

const size = document.querySelector('#size');
size.addEventListener('click', resize);