import { NumberValidationType, ValidationReportItem } from '../types'
import { AbstractVerifier } from './abstract-verifier'

export class NumberGreaterThanVerifierImpl extends AbstractVerifier {
  verify(
    validationType: NumberValidationType,
    value: string | undefined,
    validationReport: ValidationReportItem[]
  ): boolean {
    const lessThan = validationType['greater-than']
    if (lessThan !== undefined && Number(value) < lessThan) {
      validationReport.push({
        message: `has to be a number greater than '${lessThan}'`,
        found: value
      })
      return false
    }
    return true
  }
}
