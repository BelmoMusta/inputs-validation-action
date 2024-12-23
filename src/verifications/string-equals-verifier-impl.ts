import { StringValidationType, ValidationReportItem } from '../types'
import { StringAbstractVerifier } from './string-abstract-verifier'

export class StringEqualsVerifierImpl extends StringAbstractVerifier {
  verify(
    validationType: StringValidationType,
    value: string | undefined,
    validationReport: ValidationReportItem[]
  ): boolean {
    if (validationType.equals) {
      if (value !== validationType.equals) {
        validationReport.push({
          message: `has to be equal to '${validationType.equals}'`,
          found: this.convertValueToString(value)
        })
        return false
      }
    }
    return true
  }

  continueOnFailure(): boolean {
    return false
  }
}
