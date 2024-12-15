import {InputNameAndValue, ValidationReportItem, ValidationType} from "../types";
import {AbstractVerifier} from "../verifications/abstract-verifier";

export abstract class AbstractValidator {
    validate(validationType: ValidationType,
                      inputNameAndValue: InputNameAndValue): ValidationReportItem[]{
        const validationReport: ValidationReportItem[] = []
        const verifications = this.verifications();
        for (const verification of verifications) {
            const isOk = verification.verify(validationType, inputNameAndValue.value, validationReport);
            if (!verification.continueOnFailure() && !isOk) {
                // verifications are exclusive
                break
            }
        }
        return validationReport
    }

    abstract verifications(): AbstractVerifier[]
}

