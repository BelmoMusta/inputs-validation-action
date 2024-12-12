import {getValidationResult} from './validate-inputs'
import * as core from '@actions/core'

let validationResult = getValidationResult();
if (!validationResult.isValid) {
    core.setFailed(validationResult.message || "");
}


