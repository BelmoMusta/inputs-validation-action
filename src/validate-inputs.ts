import * as core from '@actions/core'
import * as YAML from 'yaml'

function getValidationScript() {
    const validation = core.getInput('validation-script');
    return YAML.parse(validation);
}

type InputNameAndValue = {
    name: string;
    value?: any;
}
export type ValidationResult = { isValid: boolean; message?: string }

function renderItem(item: ValidationReportItem) {
    return `- Input : '${item.inputName}' ${item.message}, but found '${item.found}'`
}

export function getValidationResult(): ValidationResult {
    let validationReportItems = validateInputs();
    if (validationReportItems.length > 0) {
        let message = '';
        const renderedItems = [];
        for (let item of validationReportItems) {
            const renderedItem = renderItem(item);
            renderedItems.push(renderedItem);
        }
        message = renderedItems.join('\n');
        return {isValid: false, message};
    }
    return {isValid: true};
}

export function validateInputs(): ValidationReportItem[] {
    const validationReport = [] as ValidationReportItem[]
    const validationScript = getValidationScript();
    const inputsNames = Object.keys(validationScript);
    for (const inputName of inputsNames) {
        const inputSpecification = validationScript[inputName];
        const providedInput = core.getInput(inputName);
        const input = {name: inputName, value: providedInput} as InputNameAndValue;
        const report = handleInput(input, inputSpecification);
        if (report) {
            validationReport.push(report);
        }
    }
    return validationReport;
}

type Regex = {
    required?: boolean,
    "must-be": "regex",
    value: string
}

type Number = {
    required?: boolean,
    "must-be": "number",
    "less-than"?: number
    "greater-than"?: number
}

type Boolean = {
    required?: boolean,
    "must-be": "boolean"
    value?: "true" | "false"
}
type ValidationType = Regex | Number | Boolean

type ValidationReportItem = {
    required?: boolean,
    inputName: string,
    message: string,
    found?: string,
}

function handleRegexValidation(inputSpecification: Regex, inputNameAndValue: InputNameAndValue): ValidationReportItem | undefined {
    const regExp = new RegExp(inputSpecification.value);
    if (!regExp.test(inputNameAndValue.value || "")) {
        return {
            inputName: inputNameAndValue.name,
            message: `has to match the regex '${inputSpecification.value}'`,
            found: inputNameAndValue.value,
        };
    }
}

function handleBooleanValidation(inputSpecification: Boolean, inputNameAndValue: InputNameAndValue): ValidationReportItem | undefined {
    let isValid = true;
    let message = 'has to be a boolean';
    if (inputNameAndValue.value !== "true" && inputNameAndValue.value !== "false") {
        isValid = false;
    } else if (inputSpecification.value && inputSpecification.value !== inputNameAndValue.value) {
        message = `${message} with value '${inputSpecification.value}'`; // fixme
        isValid = false;
    }
    if (!isValid) {
        return {
            inputName: inputNameAndValue.name,
            message: message,
            found: inputNameAndValue.value,
        };
    }
}

function isNumber(value?: string | number): boolean {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

function handleNumberValidation(inputSpecification: Number, inputNameAndValue: InputNameAndValue): ValidationReportItem | undefined {
    let message = `has to be a number`;
    let isValid = true;
    if (!inputNameAndValue.value) {
        isValid = false;
    } else if (!isNumber(inputNameAndValue.value)) {
        isValid = false;
    } else if (inputSpecification["greater-than"] !== undefined) {
        if (inputNameAndValue.value < inputSpecification["greater-than"]) {
            message = `${message} greater than ${inputSpecification["greater-than"]}`;
            isValid = false;
        }
        if (inputSpecification["less-than"] !== undefined) {
            if (inputNameAndValue.value > inputSpecification["less-than"]) {
                message = `${message} less than ${inputSpecification["less-than"]}`;
                isValid = false;
            }
        }
    }
    if (!isValid) {
        return {
            inputName: inputNameAndValue.name,
            message: message,
            found: inputNameAndValue.value,
        };
    }
}

export function handleInput(inputNameAndValue: InputNameAndValue, inputSpecification: ValidationType) {

    if (!inputSpecification) {
        return undefined;
    }
    // do not apply validation if input is not provided
    if (inputSpecification.required === false && !inputNameAndValue.value){
        return undefined;
    }
    const mustBe = inputSpecification["must-be"];
    let report;
    if (mustBe === "regex" && inputSpecification.value) {
        report = handleRegexValidation(inputSpecification, inputNameAndValue);
    } else if (mustBe === 'number') {
        report = handleNumberValidation(inputSpecification, inputNameAndValue);
    } else if (mustBe === 'boolean') {
        report = handleBooleanValidation(inputSpecification, inputNameAndValue);
    }
    if (report) {
        report = {...report, required: inputSpecification.required};
    }
    return report;
}
