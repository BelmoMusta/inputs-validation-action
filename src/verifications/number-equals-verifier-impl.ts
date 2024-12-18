import { NumberValidationType, ValidationReportItem } from '../types'
import { AbstractVerifier } from './abstract-verifier'

export class NumberEqualsVerifierImpl extends AbstractVerifier {
  verify(
    validationType: NumberValidationType,
    value: any,
    validationReport: ValidationReportItem[]
  ): boolean {
    const equals = validationType.equals
    const numberValue = Number(value)
    if (equals !== undefined && numberValue !== equals) {
      validationReport.push({
        message: `has to be a number equal to '${equals}'`,
        found: value
      })
      return false
    }
    return true
  }
}
