import * as core from '@actions/core'
import {InputNameAndValue, InputValidationReport, ValidationReportItem, ValidationResult, ValidationType} from './types'
import {getValidator} from "./validator-factory";
import {getValidationScript} from "./get-validation-script";

function renderItems(inputName: string, validationReportItems: ValidationReportItem[]) {
    const header = `- Input : '${inputName}'\n`;
    const details: string[] = [];
    for (const validationReportItem of validationReportItems) {
        details.push(`  * ${validationReportItem.message}, but found '${validationReportItem.found}'`)
    }
    return `${header} ${details.join('\n')}`
}

export function getValidationResult(): ValidationResult {
    const validationReport = validateInputs()
    const inputs = Object.keys(validationReport);
    if (inputs.length > 0) {
        const renderedItems = []
        for (const inputName of inputs) {
            const validationReportItems = validationReport[inputName];
            if (validationReportItems.length > 0) {
                const renderedItem = renderItems(inputName, validationReportItems)
                renderedItems.push(renderedItem)
            }
        }
        const message = renderedItems.join('\n');
        return {isValid: false, message}
    }
    return {isValid: true}
}

export function validateInputs(): InputValidationReport {
    const validationScript = getValidationScript()
    const inputsNames = Object.keys(validationScript)
    const inputValidationReport = {} as InputValidationReport
    for (const inputName of inputsNames) {
        const inputSpecification = validationScript[inputName]
        const providedInput = core.getInput(inputName)
        const input = {name: inputName, value: providedInput}
        inputValidationReport[inputName] = handleInput(input, inputSpecification)
    }
    return inputValidationReport
}

export function handleInput(
    inputNameAndValue: InputNameAndValue,
    validationType: ValidationType
) {
    if (!validationType) {
        return []
    }
    // do not apply validation if input is not provided
    if (validationType.required === false && !inputNameAndValue.value) {
        return []
    }
    const type = validationType.type
    const validator = getValidator(type);
    return validator.validate(validationType, inputNameAndValue)
}
