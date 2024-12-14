import {InputNameAndValue, NumberValidationType, ValidationReportItem} from "./types";
import {AbstractValidator} from "./abstract-validator";

function isNumber(value?: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()))
}

export class NumberValidator extends AbstractValidator {

    validate(validationType: NumberValidationType,
             inputNameAndValue: InputNameAndValue): ValidationReportItem[] {
        let message = `has to be a number`
        let isValid = true
        if (!inputNameAndValue.value) {
            isValid = false
        } else if (!isNumber(inputNameAndValue.value)) {
            isValid = false
        } else {
            const greaterThan = validationType['greater-than'];
            if (greaterThan !== undefined && inputNameAndValue.value < greaterThan) {
                message = `${message} greater than ${greaterThan}`
                isValid = false
            }
            const lessThan = validationType['less-than'];
            if (lessThan !== undefined && inputNameAndValue.value > lessThan) {
                message = `${message} less than ${lessThan}`
                isValid = false
            }
        }
        const validationReport: ValidationReportItem[] = []
        if (!isValid) {
            validationReport.push({
                message: message,
                found: inputNameAndValue.value
            })
        }
        return validationReport
    }
}