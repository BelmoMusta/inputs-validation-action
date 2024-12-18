import { AbstractValidator } from './abstract-validator'
import { AbstractVerifier } from '../verifications/abstract-verifier'
import { StringRegexVerifierImpl } from '../verifications/string-regex-verifier-impl'
import { StringLengthVerifierImpl } from '../verifications/string-length-verifier-impl'
import { StringNotBlankVerifierImpl } from '../verifications/string-not-blank-verifier-impl'
import { StringEqualsVerifierImpl } from '../verifications/string-equals-verifier-impl'

export class StringValidator extends AbstractValidator {
  verifications(): AbstractVerifier[] {
    return [
      new StringRegexVerifierImpl(),
      new StringLengthVerifierImpl(),
      new StringNotBlankVerifierImpl(),
      new StringEqualsVerifierImpl()
    ]
  }
}
