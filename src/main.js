import { DataContainer } from "/src/data-container.js";
import { WorkSection } from "/src/section-handlers/work-section-handler.js";
import { BankSection } from "/src/section-handlers/bank-section-handler.js";
import { ComputerDataHandler } from "/src/section-handlers/computer-data-handler.js"

const dataContainer = new DataContainer();
const workSection = new WorkSection(dataContainer);
const bankSection = new BankSection(dataContainer);
const computerData = new ComputerDataHandler(dataContainer);

workSection.UpdateElementsInnerHTML();
workSection.payLoanButtonElement.style.display = "none";