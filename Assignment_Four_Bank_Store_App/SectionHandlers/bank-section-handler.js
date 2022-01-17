export class BankSection
{
    constructor(dataContainer)
    {
        this.data = dataContainer;

        this.addButtonEvents();
    }

    addButtonEvents()
    {
        this.bankBalanceElement = document.getElementById("balance");
        this.outstandingLoanElement = document.getElementById("outstanding-loan");
        this.loanButtonElement = document.getElementById("loan-button");
        this.loanButtonElement.addEventListener("click", () => { this.getBankLoan(); });  
    }

    updateElementsInnerHTML()
    {
        this.bankBalanceElement.innerHTML = this.data.bankBalance;
        this.outstandingLoanElement.innerHTML = this.data.outstandingLoan;
    }

    getBankLoan()
    {
        let amountToLoan = prompt("Enter loan amount");

        if(!this.isLoanApproved(this.data.bankBalance,amountToLoan)) return;
        
        this.data.bankBalance += parseInt(amountToLoan);
        this.data.outstandingLoan += parseInt(amountToLoan);
        this.data.haveActiveLoan = true;

        this.updateElementsInnerHTML();
    }

    isLoanApproved(bankBalance, loanAmount)
    {
        if(loanAmount > (bankBalance * 2))
        {
            alert("Loan not approved");
            return false;
        }
        else if(this.data.haveActiveLoan)
        {
            alert("Loan not approved");
            return false;
        }
        else
        {
            return true;
        }
    }
}