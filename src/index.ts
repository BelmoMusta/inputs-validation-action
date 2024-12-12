import {getValidationResult} from './validate-inputs'
import * as core from '@actions/core'

let validationResult = getValidationResult();
core.info(`MESSAGE = ${validationResult.message}`);
if (!validationResult.isValid) {
    core.setFailed(validationResult.message || "");
}


