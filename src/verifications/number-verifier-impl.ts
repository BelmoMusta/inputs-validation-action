import { NumberValidationType, ValidationReportItem } from '../types'
import { AbstractVerifier } from './abstract-verifier'

function isNumber(value?: string | number): boolean {
  return value != null && value !== '' && !isNaN(Number(value.toString()))
}

export class NumberVerifierImpl extends AbstractVerifier {
  verify(
    validationType: NumberValidationType,
    value: string | undefined,
    validationReport: ValidationReportItem[]
  ): boolean {
    if (!isNumber(value)) {
      validationReport.push({
        expected: `has to be a number`,
        found: this.convertValueToString(value)
      })
      return false
    }
    return true
  }
}
