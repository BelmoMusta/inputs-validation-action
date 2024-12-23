import { getValidationResult } from './validate-inputs'
import * as core from '@actions/core'
import { setOutput } from '@actions/core'

const validationResult = getValidationResult()
core.info(`MESSAGE = ${validationResult.message}`)
setOutput('validation-result', validationResult.message)
if (!validationResult.isValid) {
  core.setFailed(validationResult.message || '')
}
