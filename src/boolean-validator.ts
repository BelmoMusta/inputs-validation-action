import {BooleanValidationType, InputNameAndValue, ValidationReportItem} from "./types";
import {AbstractValidator} from "./abstract-validator";

export class BooleanValidator extends AbstractValidator {

    validate(validationType: BooleanValidationType,
             inputNameAndValue: InputNameAndValue): ValidationReportItem[] {
        let validationReport: ValidationReportItem[] = []
        let isValid = true
        let message = 'has to be a boolean'
        if (
            inputNameAndValue.value !== 'true' &&
            inputNameAndValue.value !== 'false'
        ) {
            isValid = false
        } else if (
            validationType.value &&
            validationType.value !== inputNameAndValue.value
        ) {
            message = `${message} with value '${validationType.value}'` // fixme
            isValid = false
        }
        if (!isValid) {
            validationReport = [{
                message: message,
                found: inputNameAndValue.value
            }];
        }
        return validationReport
    }
}