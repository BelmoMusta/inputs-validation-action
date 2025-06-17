import { getValidationResult, validateInputs } from './validate-inputs'
import * as core from '@actions/core'
import { setOutput } from '@actions/core'
import { computeSummary } from './summary'
import {
  INPUT_CONTINUE_ON_FAILURE,
  OUTPUT_VALIDATION_RESULT
} from './constants'

const validationReport = validateInputs()
const validationResult = getValidationResult(validationReport)
core.info(`MESSAGE = \n${validationResult.message}`)
setOutput(OUTPUT_VALIDATION_RESULT, JSON.stringify(validationResult))
computeSummary(validationReport)
  .then(() => {
    // do nothing
  })
  .catch((error: string | Error) => core.setFailed(error))
const continueOnFailure = core.getBooleanInput(INPUT_CONTINUE_ON_FAILURE)
if (!continueOnFailure && !validationResult.isValid) {
  core.setFailed(validationResult.message || '')
}
