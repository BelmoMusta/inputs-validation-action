import { NumberValidationType, ValidationReportItem } from '../types'
import { AbstractVerifier } from './abstract-verifier'

export class NumberLessThanVerifierImpl extends AbstractVerifier {
  verify(
    validationType: NumberValidationType,
    value: string | undefined,
    validationReport: ValidationReportItem[]
  ): boolean {
    const lessThan = validationType['less-than']
    if (lessThan !== undefined && Number(value) > lessThan) {
      validationReport.push({
        expected: `has to be a number less than '${lessThan}'`,
        found: value
      })
      return false
    }
    return true
  }
}
