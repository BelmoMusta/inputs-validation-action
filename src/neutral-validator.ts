import {InputNameAndValue, ValidationReportItem, ValidationType} from "./types";
import {AbstractValidator} from "./abstract-validator";


export class NeutralValidator extends AbstractValidator {

    validate(validationType: ValidationType,
             inputNameAndValue: InputNameAndValue): ValidationReportItem[] {
        return [];
    }
}