import { DataContainer } from "./data-container.js";
import { WorkSection } from "./SectionHandlers/work-section-handler.js";
import { BankSection } from "./SectionHandlers/bank-section-handler.js";
import { ComputerDataHandler } from "./SectionHandlers/computer-data-handler.js";

const dataContainer = new DataContainer();
const workSection = new WorkSection(dataContainer);
const bankSection = new BankSection(dataContainer);
const computerData = new ComputerDataHandler(dataContainer);