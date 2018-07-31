const container = document.querySelector('#container');

function etch(){
    for(let i=0; i<16; i++){
        const line = document.createElement('div');
        container.appendChild(line);
        for(let j=0; j<16; j++){
            const div = document.createElement('div');
            div.classList.add('grid');
            line.appendChild(div);
            div.style.background = '#fff';
        }
    }

}

function clean(){
    const divs = document.querySelectorAll('.grid');
    divs.forEach(div => div.style.background = '#fff');
}

etch();

function paint(){
    this.style.cssText = 'background: #000';
}

const divs = document.querySelectorAll('.grid');
divs.forEach(div => div.addEventListener('mouseover', paint));

const clear = document.querySelector('#clear');
clear.addEventListener('click', clean);
