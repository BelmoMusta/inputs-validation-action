import {NumberValidationType, ValidationReportItem} from "../types";
import {AbstractVerifier} from "./abstract-verifier";

export class NumberLessThanVerifierImpl extends AbstractVerifier {
    verify(validationType: NumberValidationType, value: any, validationReport: ValidationReportItem[]): boolean {
        const lessThan = validationType['less-than'];
        const numberValue = Number(value);
        if (lessThan !== undefined && numberValue > lessThan) {
            validationReport.push({
                message: `has to be a number less than '${lessThan}'`,
                found: value
            })
            return false
        }
        return true
    }

}