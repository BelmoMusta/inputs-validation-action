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
export type NumberValidationType = {
    type: 'number'
    equals: number
    required?: boolean
    'less-than'?: number
    'greater-than'?: number
}
export type BooleanValidationType = {
    type: 'boolean'
    nullable?: boolean
    value?: 'true' | 'false'
}
export type ValidationType = StringValidationType  | NumberValidationType | BooleanValidationType
export type ValidationReportItem = {
    required?: boolean
    message: string
    found?: any
}
export type InputValidationReport = {
    [key: string]: ValidationReportItem [] | []
}
