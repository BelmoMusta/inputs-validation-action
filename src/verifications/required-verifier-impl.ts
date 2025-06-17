import { ValidationReportItem, ValidationType } from '../types'
import { AbstractVerifier } from './abstract-verifier'

export class RequiredVerifierImpl extends AbstractVerifier {
  verify(
    validationType: ValidationType,
    value: string,
    validationReport: ValidationReportItem[]
  ): boolean {
    if (validationType.required && value === undefined) {
      validationReport.push({
        expected: `required but not provided`,
        found: undefined
      })
      return false
    }
    return true
  }

  continueOnFailure(): boolean {
    // if a required input is not
    // provided then verifications
    // should not go further
    return false
  }
}
