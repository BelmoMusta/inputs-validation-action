import {ValidationReportItem, ValidationType} from "../types";

export abstract class AbstractVerifier {
    abstract verify(validationType: ValidationType, providedValue: any, validationReport: ValidationReportItem[]): boolean;

    continueOnFailure() {
        return true;
    }
}

