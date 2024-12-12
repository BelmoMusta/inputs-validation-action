export type InputNameAndValue = {
  name: string
  value?: any
}
export type ValidationResult = { isValid: boolean; message?: string }
export type Regex = {
  required?: boolean
  'must-be': 'regex'
  value: string
}
export type Number = {
  required?: boolean
  'must-be': 'number'
  'less-than'?: number
  'greater-than'?: number
}
export type Boolean = {
  required?: boolean
  'must-be': 'boolean'
  value?: 'true' | 'false'
}
export type ValidationType = Regex | Number | Boolean
export type ValidationReportItem = {
  required?: boolean
  inputName: string
  message: string
  found?: string
}
