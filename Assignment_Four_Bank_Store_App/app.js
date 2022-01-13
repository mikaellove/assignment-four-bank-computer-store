const earnedMoneyElement = document.getElementById("earned-money");
const workButtonElement = document.getElementById("work-button");
const bankButtonElement = document.getElementById("bank-button");
const payLoanButtonElement = document.getElementById("pay-loan");
payLoanButtonElement.addEventListener("click", () => { payLoan(); });
workButtonElement.addEventListener("click", () => { increaseEarnedMoney(); });
bankButtonElement.addEventListener("click", () => { bankEarnedMoney(); });
let earnedMoney = 0;

const bankBalanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstanding-loan");
const loanButtonElement = document.getElementById("loan-button");
loanButtonElement.addEventListener("click", () => { getBankLoan(); });
let bankBalance = 0;
let outstandingLoan = 0;
let haveActiveLoan = false;
let amountOfLoans = 0;


let isComputerBought = false;


function increaseEarnedMoney()
{
    earnedMoney += 100;

    UpdateElementsInnerHTML();
}

function bankEarnedMoney()
{
    if(outstandingLoan > 0)
    {
        let loanDeduction = earnedMoney * 0.1;
        outstandingLoan -= loanDeduction;
        bankBalance += earnedMoney - loanDeduction;

        earnedMoney = 0;
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
    if(outstandingLoan > 0)
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
            earnedMoney = earnedMoneyAfterLoanPayment;
            outstandingLoan = 0;

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
    amountOfLoans++;

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
    else if(!isComputerBought && amountOfLoans >= 1)
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