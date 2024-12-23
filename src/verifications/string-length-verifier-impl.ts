import { StringValidationType, ValidationReportItem } from '../types'
import { StringAbstractVerifier } from './string-abstract-verifier'

export class StringLengthVerifierImpl extends StringAbstractVerifier {
  verify(
    validationType: StringValidationType,
    value: string | undefined,
    validationReport: ValidationReportItem[]
  ): boolean {
    if (validationType.length) {
      const length = this.lengthOfANonBlankString(value)
      if (length !== validationType.length) {
        validationReport.push({
          message: `has to have length '${validationType.length}'`,
          found: `${length}`
        })
        return false
      }
    }
    return true
  }
}
