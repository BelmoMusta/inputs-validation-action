import * as core from '@actions/core'
import fs from 'fs'
import * as YAML from 'yaml'
import { ValidationScript } from './types'
import {
  INPUT_VALIDATION_SCRIPT,
  INPUT_VALIDATION_SCRIPT_FILE
} from './constants'

export function getValidationScript(): ValidationScript {
  const validationInlineScript = core.getInput(INPUT_VALIDATION_SCRIPT)
  if (!validationInlineScript) {
    const validationScriptFileLocation = core.getInput(
      INPUT_VALIDATION_SCRIPT_FILE
    )
    if (fs.existsSync(validationScriptFileLocation)) {
      const fileBuffer = fs.readFileSync(validationScriptFileLocation, 'utf8')
      return YAML.parse(fileBuffer.toString()) as ValidationScript
    } else {
      core.setFailed(
        `No validation script found in '${validationScriptFileLocation}'`
      )
    }
  }
  return YAML.parse(validationInlineScript) as ValidationScript
}
