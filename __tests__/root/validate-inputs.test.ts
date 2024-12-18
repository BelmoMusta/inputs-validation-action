import * as core from '@actions/core'
import { getValidationResult } from '../../src/validate-inputs'
import * as fs from 'node:fs'

let getInputMock: jest.SpiedFunction<typeof core.getInput>

function mockInputs(scriptFileLocation: string, mockedInputs: any) {
  getInputMock.mockImplementation(name => {
    switch (name) {
      case 'validation-script':
        const fileBuffer = fs.readFileSync(
          '__tests__/root/' + scriptFileLocation,
          'utf8'
        )
        return fileBuffer.toString()
      default:
        return mockedInputs[name]
    }
  })
}

describe('boolean validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  it('should get validation result if at least some validations are KO', () => {
    mockInputs('validation-script.yml', {
      'input-b': 'toto'
    })

    const validationResult = getValidationResult()
    expect(validationResult.message).not.toBeUndefined()
  })

  it('should get validation result if all the validations are OK', () => {
    mockInputs('validation-script.yml', {
      'input-b': 'this value',
      'input-a': 90
    })
    const validationResult = getValidationResult()
    expect(validationResult.isValid).toBe(true)
  })
})
