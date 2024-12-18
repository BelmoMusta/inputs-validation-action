import { NeutralValidator } from './neutral-validator'
import { NumberValidator } from './number-validator'
import { BooleanValidator } from './boolean-validator'
import { AbstractValidator } from './abstract-validator'
import { StringValidator } from './string-validator'

export function getValidator(type: string): AbstractValidator {
  let validator = new NeutralValidator()
  switch (type) {
    case 'string':
      validator = new StringValidator()
      break
    case 'number':
      validator = new NumberValidator()
      break
    case 'boolean':
      validator = new BooleanValidator()
      break
  }
  return validator
}
