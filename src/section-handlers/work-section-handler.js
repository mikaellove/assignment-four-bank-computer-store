export class WorkSection
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
        this.earnedMoneyElement = document.getElementById("earned-money");
        this.workButtonElement = document.getElementById("work-button");
        this.bankButtonElement = document.getElementById("bank-button");
        this.payLoanButtonElement = document.getElementById("pay-loan");

        this.payLoanButtonElement.addEventListener("click", () => { this.payLoan(); });
        this.workButtonElement.addEventListener("click", () => { this.increaseEarnedMoney(100); });
        this.bankButtonElement.addEventListener("click", () => { this.depositEarnedMoney(); });
    }
    UpdateElementsInnerHTML()
    {
        this.bankBalanceElement.innerHTML = this.data.bankBalance;
        this.outstandingLoanElement.innerHTML = this.data.outstandingLoan;
        this.earnedMoneyElement.innerHTML = this.data.earnedMoney;
    }

    increaseEarnedMoney(amount)
    {
        this.data.earnedMoney += amount;

        this.UpdateElementsInnerHTML();
    }

    depositEarnedMoney()
    {
        if(this.data.haveActiveLoan)
        {
            this.bankEarnedMoneyWithDeduction();
        }
        else
        {   
            this.bankEarnedMoney();
        }
    }

    bankEarnedMoneyWithDeduction()
    {
        let loanDeduction = this.data.earnedMoney * 0.1;

        if(loanDeduction > this.data.outstandingLoan)
        {
            loanDeduction -= this.data.outstandingLoan;
            this.data.outstandingLoan = 0;
        }
        else
        {
            this.data.outstandingLoan -= loanDeduction;
        }
        
        if(this.data.outstandingLoan === 0) 
        {
            this.data.haveActiveLoan = false;
        }
        
        this.data.bankBalance += this.data.earnedMoney - loanDeduction;
        this.data.earnedMoney = 0;
        this.UpdateElementsInnerHTML();
    }

    bankEarnedMoney()
    {
        this.data.bankBalance += this.data.earnedMoney;

        this.data.earnedMoney = 0;
        this.UpdateElementsInnerHTML();
    }


    payLoan()
    {
        if(this.data.haveActiveLoan)
        {
            if(this.data.earnedMoney < this.data.outstandingLoan)
            {
                this.data.outstandingLoan -= this.data.earnedMoney;
                this.data.earnedMoney = 0;
                this.UpdateElementsInnerHTML();
            }
            else
            {
                let earnedMoneyAfterLoanPayment = this.data.earnedMoney - this.data.outstandingLoan;
                this.data.bankBalance += earnedMoneyAfterLoanPayment;
                this.data.outstandingLoan = 0;
                this.payLoanButtonElement.style.display = "none";
                this.data.haveActiveLoan = false;

                this.data.earnedMoney = 0;
                this.UpdateElementsInnerHTML();
            }
        }
        else
        {
            alert("You dont have a loan to pay back!");
        }
    }
}