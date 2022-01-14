const earnedMoneyElement = document.getElementById("earned-money");
const workButtonElement = document.getElementById("work-button");
const bankButtonElement = document.getElementById("bank-button");
const payLoanButtonElement = document.getElementById("pay-loan");
payLoanButtonElement.addEventListener("click", () => { payLoan(); });
workButtonElement.addEventListener("click", () => { increaseEarnedMoney(100); });
bankButtonElement.addEventListener("click", () => { bankEarnedMoney(); });
let earnedMoney = 0;

const bankBalanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstanding-loan");
const loanButtonElement = document.getElementById("loan-button");
loanButtonElement.addEventListener("click", () => { getBankLoan(); });
let bankBalance = 0;
let outstandingLoan = 0;
let haveActiveLoan = false;

function increaseEarnedMoney(amount)
{
    earnedMoney += amount;

    UpdateElementsInnerHTML();
}

function bankEarnedMoney()
{
    if(haveActiveLoan)
    {
        let loanDeduction = earnedMoney * 0.1;
        outstandingLoan -= loanDeduction;
        bankBalance += earnedMoney - loanDeduction;

        earnedMoney = 0;
        if(outstandingLoan === 0) haveActiveLoan = false;
        UpdateElementsInnerHTML();
    }
    else
    {
        bankBalance += earnedMoney;

        earnedMoney = 0;
        UpdateElementsInnerHTML();
    }
}

function payLoan()
{
    if(haveActiveLoan)
    {
        if(earnedMoney < outstandingLoan)
        {
            outstandingLoan -= earnedMoney;
            earnedMoney = 0;
            UpdateElementsInnerHTML();
        }
        else
        {
            let earnedMoneyAfterLoanPayment = earnedMoney - outstandingLoan;
            bankBalance += earnedMoneyAfterLoanPayment;
            outstandingLoan = 0;
            haveActiveLoan = false;

            earnedMoney = 0;
            UpdateElementsInnerHTML();
        }

    }
    else
    {
        alert("You dont have a loan to pay back!");
    }
}

function getBankLoan()
{
    let borrowAmount = prompt("Enter loan amount");
    
    if(!isLoanApproved(bankBalance,borrowAmount)) return;
    
    bankBalance += parseInt(borrowAmount);
    outstandingLoan += parseInt(borrowAmount);
    haveActiveLoan = true;

    UpdateElementsInnerHTML();
}

function isLoanApproved(bankBalance, loanAmount)
{
    if(loanAmount > (bankBalance * 2))
    {
        alert("Loan not approved");
        return false;
    }
    else if(haveActiveLoan)
    {
        alert("Loan not approved");
        return false;
    }
    else
    {
        return true;
    }
}

function UpdateElementsInnerHTML()
{
    bankBalanceElement.innerHTML = bankBalance;
    outstandingLoanElement.innerHTML = outstandingLoan;
    earnedMoneyElement.innerHTML = earnedMoney;
}


const computerSelectEle = document.querySelector("#computer-selector")
const imageDivElement = document.getElementById("image-div");
const computerDescriptionElement = document.getElementById("description");
const computerSpecsDivElement = document.getElementById("computer-specs-div");
const priceElement = document.getElementById("computer-price");
const buyButtonElement = document.getElementById("buy-computer-button");

buyButtonElement.addEventListener("click", () => {
    buyComputer();
})

computerSelectEle.addEventListener("change",() => { 
    clearComputerSpecsDivArray();
    displayComputerInfo(computerDataCache,computerSelectEle.selectedIndex);

    chosenComputerName = computerSelectEle[computerSelectEle.selectedIndex].textContent;
});

let computerDataCache = [];
computerSelectEle.selectedIndex = 0;
let chosenComputerPrice = 0;
let chosenComputerName = "";
let computerSpecsDivArray = [];

async function fetchAndDisplayData()
{
    const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");

    const computerData = await response.json();
    
    computerDataCache = computerData;

    createComputerDropdownList(computerData);
    
    displayComputerInfo(computerDataCache,computerSelectEle.selectedIndex);
}

function displayComputerInfo(computerData,index)
{
    displayImage(computerData,index);
    displayComputerDescription(computerData,index);
    displayComputerPrice(computerData,index);

    computerData[index].specs.forEach((spec) =>
    {
        configureAndDisplayComputerSpecs(spec);
    })
}

function displayComputerDescription(data,index)
{
    computerDescriptionElement.innerHTML = "<b>" + data[index].description + "</b>";
}

function displayComputerPrice(data,index)
{
    priceElement.innerHTML = "Price: " + data[index].price;
    chosenComputerPrice = data[index].price;
}

function displayImage(data,index)
{
    const computerImg = document.getElementById("computer-image");
    if(computerImg) computerImg.remove();

    configureAndCreateImage("https://noroff-komputer-store-api.herokuapp.com/" + data[index].image);
}

function createComputerDropdownList(data)
{
        data.forEach((computer) => 
            {
                const computerElement = document.createElement("option");
                computerElement.value = computer.id;
                computerElement.appendChild(document.createTextNode(computer.title));
                computerSelectEle.appendChild(computerElement);
                chosenComputerName = computerSelectEle[computerSelectEle.selectedIndex].textContent;
            })
}
    
    function configureAndCreateImage(src) {
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

        imageDivElement.appendChild(img);
    }
    
    function configureAndDisplayComputerSpecs(txt)
    {
        let div = document.createElement("div");
        div.innerHTML = txt;
        div.style.paddingBottom = "7px"
        
        computerSpecsDivArray.push(div);
        computerSpecsDivElement.appendChild(div);
    }

    function clearComputerSpecsDivArray()
    {
        computerSpecsDivArray.forEach((div) => {
            div.remove();
        })
    }
    
    function buyComputer()
    {
        if(bankBalance >= chosenComputerPrice)
        {
            alert("You have bought " + chosenComputerName);
            bankBalance -= chosenComputerPrice;

            UpdateElementsInnerHTML();
        }
        else
        {
            alert("You cant afford this computer.");
        }
    }

fetchAndDisplayData();