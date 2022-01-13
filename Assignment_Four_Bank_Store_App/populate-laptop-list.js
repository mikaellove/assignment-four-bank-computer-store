const laptopsElement = document.getElementById("laptops");



async function loadLaptops()
{
    const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");

    const laptops = await response.json();

    console.log(laptops);
}

loadLaptops();


