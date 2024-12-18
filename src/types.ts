export type InputNameAndValue = {
    name: string
    value?: any
}
export type ValidationResult = { isValid: boolean; message?: string }
export type StringValidationType = {
    type: 'string'
    length?: number
    'length-less-than'?: number
    'length-greater-than'?: number
    'not-blank'?: boolean
    regex?: string
    equals: string
}
export type NumberValidationType = {
    type: 'number'
    equals: number
    required?: boolean
    'less-than'?: number
    'greater-than'?: number
}
export type BooleanValidationType = {
    type: 'boolean'
    equals?: 'true' | 'false'
}
export type ValidationType = StringValidationType | NumberValidationType | BooleanValidationType
export type ValidationReportItem = {
    message: string
    found?: any
}
export type InputValidationReport = {
    [key: string]: ValidationReportItem [] | []
}
