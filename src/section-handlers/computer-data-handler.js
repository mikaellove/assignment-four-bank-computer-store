/**
 * Handles fetching the computer data from the api and displays them on the UI. Handles the feature of buying a computer.
 */
export class ComputerDataHandler
{
    /**
     * Gets the dom elements and listens on change and click event.
     * @param {Object that contains all the current data values that is used through out the app} dataContainer 
     * Also invokes the function fetchAndDisplayData().
     */
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

    /**
     * Fetches the data from the api and displays it to the computer section of the application.
     */
    async fetchAndDisplayData()
    {
        const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");

        const computerData = await response.json();
        
        this.computerDataCache = computerData;

        this.createComputerDropdownList(computerData);
        
        this.displayComputerInfo(this.computerDataCache,this.computerSelectEle.selectedIndex);
    }   
    /**
     * Displays the currently selected computers information
     * @param {Contains all the computer data that was fetched from the api} computerData 
     * @param {index of currenty selected computer} index 
     */
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
/**
 * displays the description of the selected computer
 * @param {contains the computer info data} data 
 * @param {index of currently selected computer} index 
 */
    displayComputerDescription(data,index)
    {
        this.computerDescriptionElement.innerHTML = "<b>" + data[index].description + "</b>";
    }
/**
 * displays the price of the selected computer
 * @param {contains the computer info data} data 
 * @param {index of currently selected computer} index 
 */
    displayComputerPrice(data,index)
    {
        this.priceElement.innerHTML = "Price: " + data[index].price;
        this.chosenComputerPrice = data[index].price;
    }
/**
 * displays the image of the currently selected computer
 * @param {contains the computer info data} data 
 * @param {index of currently selected computer} index 
 */
    displayImage(data,index)
    {
        const computerImg = document.getElementById("computer-image");
        if(computerImg) computerImg.remove();

        this.configureAndCreateImage("https://noroff-komputer-store-api.herokuapp.com/" + data[index].image);
    }

    /**
     * creates a image element with the specific configurations.
     * subscribes a anynymous method to the error event handler which then replaces the format to a png.
     * @param {url for the image} src 
     */
    configureAndCreateImage(src) 
    {
        let img = document.createElement("img");
        img.height = 300;
        img.width = 300;
        img.src = src;
        img.id = "computer-image"
       
        img.onerror = () => 
        {
            const srcWithoutFormat = src.substring(0,src.length - 4);
            img.src = srcWithoutFormat + ".png";
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
    /**
     * Creates a paragraph element and displays the given text.
     * @param {*} txt 
     */
    configureAndDisplayComputerSpecs(txt)
    {
        let div = document.createElement("p");
        div.innerHTML = txt;
        
        this.computerSpecsDivArray.push(div);
        this.computerSpecsDivElement.appendChild(div);
    }

    /**
     * removes the list of currently viewed computer specifications
     */
    clearComputerSpecsDivArray()
    {
        this.computerSpecsDivArray.forEach((div) => {
            div.remove();
        })
    }
    /**
     * Checks if the user can afford to buy a computer or not then performs that action.
     */
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