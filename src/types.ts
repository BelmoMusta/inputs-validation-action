export type InputNameAndValue = {
    name: string
    value?: any
}
export type ValidationResult = { isValid: boolean; message?: string }
export type StringValidationType = {
    type: 'string'
    required?: boolean
    length?: number
    'length-less-than'?: number
    'length-greater-than'?: number
    regex?: string
    value: string
}
export type RegexValidationType = {
    type: 'regex'
    required?: boolean
    value: string
}
export type NumberValidationType = {
    type: 'number'
    required?: boolean
    'less-than'?: number
    'greater-than'?: number
}
export type BooleanValidationType = {
    type: 'boolean'
    required?: boolean
    value?: 'true' | 'false'
}
export type ValidationType = StringValidationType | RegexValidationType | NumberValidationType | BooleanValidationType
export type ValidationReportItem = {
    required?: boolean
    message: string
    found?: string
}
export type InputValidationReport = {
    [key: string]: ValidationReportItem [] | []
}
