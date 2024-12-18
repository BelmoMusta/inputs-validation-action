import {BooleanValidationType, ValidationReportItem} from "../types";
import {AbstractVerifier} from "./abstract-verifier";

export class BooleanVerifierImpl extends AbstractVerifier {
    verify(validationType: BooleanValidationType, value: any, validationReport: ValidationReportItem[]): boolean {
        let isValid = true
        let message = 'has to be a boolean'
        if (value !== 'true' && value !== 'false') {
            isValid = false
        } else if (validationType.value && validationType.value !== value) {
            message = `${message} with value '${validationType.value}'` // fixme
            isValid = false
        }
        if (!isValid) {
            validationReport.push({
                message: message,
                found: value === undefined? '' :`'${value}'`
            });
        }
        return isValid
    }

}