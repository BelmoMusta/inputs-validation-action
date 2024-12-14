import * as core from "@actions/core";
import fs from "node:fs";
import * as YAML from "yaml";

export function getValidationScript() {
    const validationInlineScript = core.getInput('validation-script')
    if (!validationInlineScript) {
        const validationScriptFileLocation = core.getInput('validation-script-file')
        if (fs.existsSync(validationScriptFileLocation)) {
            const fileBuffer = fs.readFileSync(validationScriptFileLocation, 'utf8')
            return YAML.parse(fileBuffer.toString())
        } else {
            core.setFailed(
                `No validation script found in '${validationScriptFileLocation}'`
            )
        }
    }
    return YAML.parse(validationInlineScript)
}