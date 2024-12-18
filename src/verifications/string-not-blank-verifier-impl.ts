import {StringValidationType, ValidationReportItem} from "../types";
import {StringAbstractVerifier} from "./string-abstract-verifier";

export class StringNotBlankVerifierImpl extends StringAbstractVerifier {
    verify(validationType: StringValidationType, value: string, validationReport: ValidationReportItem[]): boolean {
        if (validationType["not-blank"]) {
            const length = this.lengthOfANonBlankString(value)
            if (length === 0) {
                validationReport.push({
                    message: `has to be a non blank string`
                })
                return false;
            }
        }
        return true
    }
}
