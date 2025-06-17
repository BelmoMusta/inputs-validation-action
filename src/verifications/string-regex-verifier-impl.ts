import { StringValidationType, ValidationReportItem } from '../types'
import { StringAbstractVerifier } from './string-abstract-verifier'

export class StringRegexVerifierImpl extends StringAbstractVerifier {
  verify(
    validationType: StringValidationType,
    value: string | undefined,
    validationReport: ValidationReportItem[]
  ): boolean {
    if (validationType.regex) {
      const regExp = new RegExp(validationType.regex)
      if (!value || !regExp.test(value)) {
        validationReport.push({
          expected: `has to match the regex '${validationType.regex}'`,
          found: value
        })
      }
      return false
    }
    return true
  }
}
