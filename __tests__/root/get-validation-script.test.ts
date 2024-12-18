import * as core from '@actions/core'
import * as fs from 'node:fs'
import {getValidationScript} from "../../src/get-validation-script";

let getInputMock: jest.SpiedFunction<typeof core.getInput>
let coreSetFailed: jest.SpiedFunction<typeof core.setFailed>

function mockInputs(scriptFileLocation: string, mockedInputs: any, fallBackScriptFile: string) {
    getInputMock.mockImplementation(name => {
        switch (name) {
            case "validation-script-file":
                return '__tests__/root/' + fallBackScriptFile
            case 'validation-script':
                let path = '__tests__/root/' + scriptFileLocation;
                if (fs.existsSync(path)) {
                    const fileBuffer = fs.readFileSync(
                        path,
                        'utf8'
                    )
                    return fileBuffer.toString()
                }
                return ''
            default:
                return mockedInputs[name];
        }
    })
}

describe('get-validation-script tests', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
        coreSetFailed = jest.spyOn(core, 'setFailed').mockImplementation()
    })

    it('should get the validation script', () => {
        mockInputs('neutral-validation-script.yml', {}, '')
        let validationScript = getValidationScript();
        expect(validationScript).not.toBeUndefined();
    });

    it('should fallback to the value of validation-script-file input to get the validation script', () => {
        mockInputs('xxxx-neutral-validation-script.yml', {}, 'neutral-validation-script.yml')
        let validationScript = getValidationScript();
        expect(validationScript).not.toBeUndefined();
    });

    it('should fallback to the value of validation-script-file input to get the validation script', () => {
        mockInputs('xxxx-neutral-validation-script.yml', {}, 'xxxx-neutral-validation-script.yml')
        getValidationScript()
        expect(coreSetFailed).toHaveBeenCalledWith(`No validation script found in '__tests__/root/xxxx-neutral-validation-script.yml'`)
    });


})
