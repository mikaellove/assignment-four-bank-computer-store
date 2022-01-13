const laptopsElement = document.querySelector("#laptops")
const imageDivElement = document.getElementById("image-div");
const computerDescriptionElement = document.getElementById("description");
const computerSpecsDivElement = document.getElementById("computer-specs-div");
laptopsElement.addEventListener("change",() => { ChangeImage("https://noroff-komputer-store-api.herokuapp.com/"+computerData[laptopsElement.selectedIndex].image) });
let computerData = [];
laptopsElement.selectedIndex = 0;

async function loadComputerInfo()
{
    const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");

    const laptops = await response.json();

    
    computerData = laptops;
    
    showImage("https://noroff-komputer-store-api.herokuapp.com/"+laptops[0].image);

    computerDescriptionElement.innerHTML = "<b>" + laptops[0].description + "</b>";

    laptops[0].specs.forEach((spec) =>
    {
        console.log(spec);
        showComputerSpecifications(spec);
    })
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
    // This next line will just add it to the <body> tag
    imageDivElement.appendChild(img);
}

function showComputerSpecifications(txt)
{
    let div = document.createElement("div");
    div.innerHTML = txt;
    div.style.paddingBottom = "7px"
    
    computerSpecsDivElement.appendChild(div);
}

loadLaptops();
loadComputerInfo();
//showImage("https://noroff-komputer-store-api.herokuapp.com/computers"+computerData[laptopsElement.selectedIndex].image,"hej");