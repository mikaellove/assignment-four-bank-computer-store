const laptopsElement = document.querySelector("#laptops")
const imageDivElement = document.getElementById("image-div");
const computerDescriptionElement = document.getElementById("description");
const computerSpecsDivElement = document.getElementById("computer-specs-div");
const priceElement = document.getElementById("computer-price");
const buyButtonElement = document.getElementById("buy-computer-button");
laptopsElement.addEventListener("change",() => { 
    ChangeImage("https://noroff-komputer-store-api.herokuapp.com/"+computerData[laptopsElement.selectedIndex].image);
    setComputerDescription(computerData,laptopsElement.selectedIndex);
    setComputerPrice(computerData,laptopsElement.selectedIndex);
    clearDivArray();
    computerData[laptopsElement.selectedIndex].specs.forEach((spec) => 
    { 
        showComputerSpecifications(spec);
    });
});

let computerData = [];
laptopsElement.selectedIndex = 0;

async function loadComputerInfo()
{
    const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");

    const laptops = await response.json();

    
    computerData = laptops;
    
    showImage("https://noroff-komputer-store-api.herokuapp.com/"+laptops[0].image);

    
    setComputerPrice(laptops,0);
    setComputerDescription(laptops,0);
    

    
    laptops[0].specs.forEach((spec) =>
    {
        console.log(spec);
        showComputerSpecifications(spec);
    })
}

function setComputerDescription(data,index)
{
    computerDescriptionElement.innerHTML = "<b>" + data[index].description + "</b>";
}

function setComputerPrice(data,index)
{
    priceElement.innerHTML = "Price: " + data[index].price;
}

function loadLaptops()
{
    fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
        .then((response) => { return response.json() })
        .then((computers) => 
        {
            computerData = computers;
            computers.forEach((computer) => 
            {
                const computerElement = document.createElement("option");
                computerElement.value = computer.id;
                computerElement.appendChild(document.createTextNode(computer.title));
                laptopsElement.appendChild(computerElement);
            })
        })
}

function ChangeImage(src)
{
    document.getElementById("computer-image").remove();
    showImage(src);
}

function showImage(src,alt) {
    let img = document.createElement("img");
    img.height = 300;
    img.width = 300;
    img.src = src;
    img.alt = alt;
    img.id = "computer-image"

    imageDivElement.appendChild(img);
}
let divArray = [];
function showComputerSpecifications(txt)
{
    let div = document.createElement("div");
    div.innerHTML = txt;
    div.style.paddingBottom = "7px"
    
    divArray.push(div);
    computerSpecsDivElement.appendChild(div);
}
function clearDivArray()
{
    divArray.forEach((div) => {
        div.remove();
    })
}

loadLaptops();
loadComputerInfo();