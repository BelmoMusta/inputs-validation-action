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

describe('neutral validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  it('should run neutral validation if validation type is not recognized', () => {
    mockInputs('neutral-validation-script.yml', {
      'input-b': 'toto'
    })

    const validationResult = getValidationResult()
    expect(validationResult.message).toBeUndefined()
  })
})
