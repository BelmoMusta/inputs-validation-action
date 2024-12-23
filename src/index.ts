import { getValidationResult } from './validate-inputs'
import * as core from '@actions/core'
import { setOutput } from '@actions/core'

const validationResult = getValidationResult()
core.info(`MESSAGE = \n${validationResult.message}`)
setOutput('validation-result', validationResult.message)
const continueOnFailure = core.getBooleanInput('continue-on-failure')
if (!continueOnFailure && !validationResult.isValid) {
  core.setFailed(validationResult.message || '')
}
