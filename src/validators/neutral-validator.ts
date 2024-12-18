import { AbstractValidator } from './abstract-validator'
import { AbstractVerifier } from '../verifications/abstract-verifier'

export class NeutralValidator extends AbstractValidator {
  verifications(): AbstractVerifier[] {
    return []
  }
}
