import { ValidationReportItem, ValidationType } from '../types'

export abstract class AbstractVerifier {
  abstract verify(
    validationType: ValidationType,
    providedValue: string | undefined,
    validationReport: ValidationReportItem[]
  ): boolean

  continueOnFailure(): boolean {
    return false
  }

  protected convertValueToString(value: string | undefined): string {
    return value === undefined ? '' : `'${value}'`
  }
}
