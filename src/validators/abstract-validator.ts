import {
  InputNameAndValue,
  ValidationReportItem,
  ValidationType
} from '../types'
import { AbstractVerifier } from '../verifications/abstract-verifier'
import {RequiredVerifierImpl} from "../verifications/required-verifier-impl";

export abstract class AbstractValidator {
  validate(
    validationType: ValidationType,
    inputNameAndValue: InputNameAndValue
  ): ValidationReportItem[] {
      const validationReport: ValidationReportItem[] = []
      const verifications = this.verifications()
      const requiredVerifier = new RequiredVerifierImpl();
      const allVerifiers: AbstractVerifier[] = [requiredVerifier, ...verifications]
    for (const verification of allVerifiers) {
      const isOk = verification.verify(
        validationType,
        inputNameAndValue.value,
        validationReport
      )
      if (!verification.continueOnFailure() && !isOk) {
        // verifications are exclusive
        break
      }
    }
    return validationReport
  }

  abstract verifications(): AbstractVerifier[]
}
