import {NumberValidationType, ValidationReportItem} from "../types";
import {AbstractVerifier} from "./abstract-verifier";

function isNumber(value?: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()))
}

export class NumberVerifierImpl extends AbstractVerifier {
    verify(validationType: NumberValidationType, value: any, validationReport: ValidationReportItem[]): boolean {
        if (!isNumber(value)) {
            validationReport.push({
                message: `has to be a number`,
                found: value
            })
            return false
        }
        return true
    }
}