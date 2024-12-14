import {InputNameAndValue, ValidationReportItem, ValidationType} from "./types";

export abstract class AbstractValidator {
    abstract validate(validationType: ValidationType,
                      inputNameAndValue: InputNameAndValue): ValidationReportItem[];
}

