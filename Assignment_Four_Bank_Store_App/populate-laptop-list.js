const laptopsElement = document.getElementById("laptops");



async function loadLaptops()
{
    const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");

    const laptops = await response.json();

    console.log(laptops);
    laptops.forEach(element => {
        console.log(element.title);
    });
    
}

let laptops = [];
function la()
{
    fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
        .then((response) => { response.json() })
        .then((data) => 
        {
            
            laptops = data;
            console.log(laptops);
            
        })
}

loadLaptops();
la();