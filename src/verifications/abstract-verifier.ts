import {ValidationReportItem, ValidationType} from "../types";

export abstract class AbstractVerifier {
    abstract verify(validationType: ValidationType, providedValue: any, validationReport: ValidationReportItem[]): boolean;

    continueOnFailure() {
        return false;
    }

    protected convertValueToString(value: any) {
        return value === undefined ? '' : `'${value}'`;
    }
}

