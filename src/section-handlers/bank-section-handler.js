/**
 * Handles the bank section of the application.
 */
export class BankSection
{
    constructor(dataContainer)
    {
        this.data = dataContainer;

        this.addButtonEvents();
    }

    /**
     * Gets the elements from the HTML
     * Adds getBankLoan() to onClick event for loan button
     */
    addButtonEvents()
    {
        this.payLoanButton = document.getElementById("pay-loan");
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

    /**
     * Here the amount to loan is inputed.
     * Checks if the loan is approved or not.
     * Then adds the given amount to bank balance and the outstanding loan.
     * @returns nothing statement is for exiting method.
     * 
     */
    getBankLoan()
    {
        let amountToLoan = prompt("Enter loan amount");
        if(amountToLoan === null) return;

        if(!this.isLoanApproved(this.data.bankBalance,amountToLoan)) return;
        
        this.data.bankBalance += parseInt(amountToLoan);
        this.data.outstandingLoan += parseInt(amountToLoan);
        this.data.haveActiveLoan = true;
        
        this.updateElementsInnerHTML();
    }
    
    /**
     * Decides if the loan is approved or not.
     * @param {the current amount the user have deposited on the bank} bankBalance 
     * @param {the amount the user is about to loan} loanAmount 
     * @returns 
     */
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
            this.payLoanButton.style.display = "";
            return true;
        }
    }
}