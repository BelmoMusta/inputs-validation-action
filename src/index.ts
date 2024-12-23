import { getValidationResult, validateInputs } from './validate-inputs'
import * as core from '@actions/core'
import { setOutput } from '@actions/core'
import { computeSummary } from './summary'

const validationReport = validateInputs()
const validationResult = getValidationResult(validationReport)
core.info(`MESSAGE = \n${validationResult.message}`)
setOutput('validation-result', validationResult.message)
computeSummary(validationReport)
  .then(() => {
    // o nothing
  })
  .catch((error: string | Error) => core.setFailed(error))
const continueOnFailure = core.getBooleanInput('continue-on-failure')
if (!continueOnFailure && !validationResult.isValid) {
  core.setFailed(validationResult.message || '')
}
