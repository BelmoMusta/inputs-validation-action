import {BooleanValidationType, InputNameAndValue, ValidationReportItem} from "../types";
import {AbstractValidator} from "./abstract-validator";
import {AbstractVerifier} from "../verifications/abstract-verifier";

export class BooleanValidator extends AbstractValidator {

    validate(validationType: BooleanValidationType,
             inputNameAndValue: InputNameAndValue): ValidationReportItem[] {
        const validationReport: ValidationReportItem[] = []
        let isValid = true
        let message = 'has to be a boolean'
        if (validationType.nullable === false && !inputNameAndValue.value) {
            isValid = false
        } else if (inputNameAndValue.value !== 'true' && inputNameAndValue.value !== 'false') {
            isValid = false
        } else if (validationType.value && validationType.value !== inputNameAndValue.value) {
            message = `${message} with value '${validationType.value}'` // fixme
            isValid = false
        }
        if (!isValid) {
            validationReport.push({
                message: message,
                found: inputNameAndValue.value
            });
        }
        return validationReport
    }

    verifications(): AbstractVerifier[] {
        return [];
    }
}