import * as core from '@actions/core'
import {
  InputNameAndValue,
  InputValidationReport,
  ValidationReportItem,
  ValidationResult,
  ValidationType
} from './types'
import { getValidator } from './validators/validator-factory'
import { getValidationScript } from './get-validation-script'

function renderItems(
  inputName: string,
  validationReportItems: ValidationReportItem[]
): string {
  const header = `- Input : '${inputName}'\n`
  const details: string[] = []
  for (const validationReportItem of validationReportItems) {
    if (validationReportItem.found !== undefined) {
      details.push(
        `  + ${validationReportItem.message}, but found ${validationReportItem.found}`
      )
    } else {
      details.push(`  + ${validationReportItem.message}`)
    }
  }
  return `${header}${details.join('\n')}`
}

export function getValidationResult(): ValidationResult {
  const validationReport = validateInputs()
  const inputs = Object.keys(validationReport)
  const renderedItems = []
  if (inputs.length > 0) {
    for (const inputName of inputs) {
      const validationReportItems = validationReport[inputName]
      if (validationReportItems.length > 0) {
        const renderedItem = renderItems(inputName, validationReportItems)
        renderedItems.push(renderedItem)
      }
    }
  }

  if (renderedItems.length > 0) {
    return { isValid: false, message: renderedItems.join('\n') }
  }
  return { isValid: true }
}

export function validateInputs(): InputValidationReport {
  const validationScript = getValidationScript()
  const inputsNames = Object.keys(validationScript)
  const inputValidationReport = {} as InputValidationReport
  for (const inputName of inputsNames) {
    const inputSpecification = validationScript[inputName]
    const providedInput = core.getInput(inputName)
    const input = { name: inputName, value: providedInput }
    inputValidationReport[inputName] = handleInput(input, inputSpecification)
  }
  return inputValidationReport
}

export function handleInput(
  inputNameAndValue: InputNameAndValue,
  validationType: ValidationType
): ValidationReportItem[] {
  const type = validationType.type
  const validator = getValidator(type)
  return validator.validate(validationType, inputNameAndValue)
}
