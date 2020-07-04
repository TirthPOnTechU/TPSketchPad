const sketchpad=document.querySelector('.pad');
const form=document.querySelector('.width');
const widthInput=document.querySelector('input');
const resetBtn=document.querySelector('.fa-undo');
const normalBtn=document.querySelector('.normal-btn');
const hardBtn=document.querySelector('.hard-btn');
const rainbowBtn=document.querySelector('.rainbow-btn');

let whiteCol='rgb(248,248,248)';
let blackCol='rgb(43, 43, 40)';

let pixelList=undefined;
let mode=undefined;
let currentColor=undefined;

document.addEventListener('DOMContentLoaded',(e)=>{
    mode='normal';
    defaultSetUp();

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        showForm(e);
    });

    resetBtn.addEventListener('click',(e)=>{
        pixelList.forEach(pixel => {
            pixel.style.backgroundColor=whiteCol;
        });
    });

    sketchpad.addEventListener('mouseover',(e)=>{
        if(e.target.className.indexOf('padPixel')>-1){
            e.target.style.backgroundColor=getColor(e);
        }
    });
    normalBtn.addEventListener('click',(e)=>{
        mode='normal';
    })
    rainbowBtn.addEventListener('click',(e)=>{
        console.log('clicked')
        mode='random';
    })
    hardBtn.addEventListener('click',(e)=>{
        mode='hard';
    })
})

function defaultSetUp(){
    let padSize=16;
    let size=500 / padSize;
    renderPad(padSize,size);
}

function showForm(){
    clearPad();
    padSize=parseInt(widthInput.value);
    size=500 / padSize;
    renderPad(padSize,size);
}

function getColor(e){
    if(mode=='random'){
        return getRandomColor();
    }else if(mode=='hard'){
        return getDarkerColor(e.target.style.backgroundColor);
    }else{
        return blackCol;
    }
}

function getRandomColor(){
    let r1=Math.floor(Math.random()*255);
    let r2=Math.floor(Math.random()*255);
    let r3=Math.floor(Math.random()*255);
    return `rgb(${r1},${r2},${r3})`;
}

function getDarkerColor(oldColor){
    let oldColorList=oldColor.substring(4,oldColor.length-1).split(', ');
    newColList=oldColorList.map(function(num){
        return (parseInt(num)-20).toString();
    });
    return 'rgb('+newColList.join(', ')+')';
}



function clearPad(){
    sketchpad.innerHTML='';
}




function renderPad(padSize, pixelSize){
    for (let i = 0; i < padSize; i++) {
        let padRow=document.createElement('div');
        padRow.style.display='flex';
        for (let j = 0; j < padSize; j++) {
            let newPixel=document.createElement('div');
            newPixel.style.width=`${pixelSize}px`;
            newPixel.style.height=`${pixelSize}px`;
            newPixel.style.border='1px solid var(--mainBlack)';
            newPixel.style.backgroundColor=whiteCol;
            newPixel.classList.add('padPixel');

            padRow.appendChild(newPixel);
        }
        sketchpad.appendChild(padRow);
    }
    pixelList=[...document.querySelectorAll('.padPixel')];
}