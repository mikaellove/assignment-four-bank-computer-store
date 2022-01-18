export class ComputerDataHandler
{
    constructor(dataContainer)
    {
        this.data = dataContainer;
        
        this.bankBalanceElement = document.getElementById("balance");
        this.computerSelectEle = document.querySelector("#computer-selector")
        this.imageDivElement = document.getElementById("image-div");
        this.computerDescriptionElement = document.getElementById("description");
        this.computerSpecsDivElement = document.getElementById("computer-specs-div");
        this.priceElement = document.getElementById("computer-price");
        this.buyButtonElement = document.getElementById("buy-computer-button");   

        this.buyButtonElement.addEventListener("click", () => {
            this.buyComputer();
        })
        
        this.computerSelectEle.addEventListener("change",() => { 
            this.clearComputerSpecsDivArray();
            this.displayComputerInfo(this.computerDataCache,this.computerSelectEle.selectedIndex);
        
            this.chosenComputerName = this.computerSelectEle[this.computerSelectEle.selectedIndex].textContent;
        });

        this.computerDataCache = [];
        this.computerSelectEle.selectedIndex = 0;
        this.chosenComputerPrice = 0;
        this.chosenComputerName = "";
        this.computerSpecsDivArray = [];

        this.fetchAndDisplayData();
    }

    async fetchAndDisplayData()
    {
        const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");

        const computerData = await response.json();
        
        this.computerDataCache = computerData;

        this.createComputerDropdownList(computerData);
        
        this.displayComputerInfo(this.computerDataCache,this.computerSelectEle.selectedIndex);
    }   

    displayComputerInfo(computerData,index)
    {
        this.displayImage(computerData,index);
        this.displayComputerDescription(computerData,index);
        this.displayComputerPrice(computerData,index);

        computerData[index].specs.forEach((spec) =>
        {
            this.configureAndDisplayComputerSpecs(spec);
        })
    }

    displayComputerDescription(data,index)
    {
        this.computerDescriptionElement.innerHTML = "<b>" + data[index].description + "</b>";
    }

    displayComputerPrice(data,index)
    {
        this.priceElement.innerHTML = "Price: " + data[index].price;
        this.chosenComputerPrice = data[index].price;
    }

    displayImage(data,index)
    {
        const computerImg = document.getElementById("computer-image");
        if(computerImg) computerImg.remove();

        this.configureAndCreateImage("https://noroff-komputer-store-api.herokuapp.com/" + data[index].image);
    }

    configureAndCreateImage(src) 
    {
        let img = document.createElement("img");
        img.height = 300;
        img.width = 300;
        img.src = src;
        img.id = "computer-image"
       
        img.onerror = () => 
        {
            img.alt = "Computer missing image!"
            return;
        }

        this.imageDivElement.appendChild(img);
    }

    createComputerDropdownList(data)
    {
        data.forEach((computer) => 
            {
                const computerElement = document.createElement("option");
                computerElement.value = computer.id;
                computerElement.style.backgroundColor = "#ede8e8";
                computerElement.appendChild(document.createTextNode(computer.title));
                this.computerSelectEle.appendChild(computerElement);
                this.chosenComputerName = this.computerSelectEle[this.computerSelectEle.selectedIndex].textContent;
            })
    }

    configureAndDisplayComputerSpecs(txt)
    {
        let div = document.createElement("p");
        div.innerHTML = txt;
        
        this.computerSpecsDivArray.push(div);
        this.computerSpecsDivElement.appendChild(div);
    }

    clearComputerSpecsDivArray()
    {
        this.computerSpecsDivArray.forEach((div) => {
            div.remove();
        })
    }

    buyComputer()
    {
        if(this.data.bankBalance >= this.chosenComputerPrice)
        {
            alert("You have bought " + this.chosenComputerName);
            this.data.bankBalance -= this.chosenComputerPrice;

            this.bankBalanceElement.innerHTML = this.data.bankBalance;
        }
        else
        {
            alert("You cant afford this computer.");
        }
    }
}