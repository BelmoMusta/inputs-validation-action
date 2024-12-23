import { BooleanValidationType, ValidationReportItem } from '../types'
import { AbstractVerifier } from './abstract-verifier'

export class BooleanVerifierImpl extends AbstractVerifier {
  verify(
    validationType: BooleanValidationType,
    value: string,
    validationReport: ValidationReportItem[]
  ): boolean {
    let isValid = true
    let message = 'has to be a boolean'
    if (value !== 'true' && value !== 'false') {
      isValid = false
    } else if (validationType.equals && validationType.equals !== value) {
      message = `${message} with value '${validationType.equals}'`
      isValid = false
    }
    if (!isValid) {
      validationReport.push({
        message: message,
        found: this.convertValueToString(value)
      })
    }
    return isValid
  }
}
