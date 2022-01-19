import { DataContainer } from "./data-container.js";
import { WorkSection } from "./section-handlers/work-section-handler.js";
import { BankSection } from "./section-handlers/bank-section-handler.js";
import { ComputerDataHandler } from "./section-handlers/computer-data-handler.js"

const dataContainer = new DataContainer();
const workSection = new WorkSection(dataContainer);
const bankSection = new BankSection(dataContainer);
const computerData = new ComputerDataHandler(dataContainer);

workSection.UpdateElementsInnerHTML();
workSection.payLoanButtonElement.style.display = "none";