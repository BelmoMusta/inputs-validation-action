import {InputNameAndValue, StringValidationType, ValidationReportItem} from "./types";
import {AbstractValidator} from "./abstract-validator";

export class StringValidator extends AbstractValidator {
    validate(validationType: StringValidationType,
             inputNameAndValue: InputNameAndValue): ValidationReportItem[] {
        const validationReport: ValidationReportItem[] = []
        if (validationType.regex) {
            const regExp = new RegExp(validationType.regex)
            if (!regExp.test(inputNameAndValue.value || '')) {
                validationReport.push({
                    message: `has to match the regex '${validationType.regex}'`,
                    found: inputNameAndValue.value
                })
            }
        }
        return validationReport
    }
}