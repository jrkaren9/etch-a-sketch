const container = document.querySelector('#container');

for(let i=0; i<16; i++){
    const line = document.createElement('div');
    container.appendChild(line);
    for(let j=0; j<16; j++){
        const div = document.createElement('div');
        div.classList.add('grid');
        line.appendChild(div);
    }
}

function paint(){
    this.style.cssText = 'background: #000';
}

const divs = document.querySelectorAll('.grid');
divs.forEach(div => div.addEventListener('mouseover', paint));