import * as core from '@actions/core'
import { validateInputs } from '../../src/validate-inputs'
import * as fs from 'node:fs'

let getInputMock: jest.SpiedFunction<typeof core.getInput>

function mockInputs(scriptFileLocation: string, mockedInputs: object) {
  getInputMock.mockImplementation((name: string) => {
    switch (name) {
      case 'validation-script': {
        const fileBuffer = fs.readFileSync(
          '__tests__/required/' + scriptFileLocation,
          'utf8'
        )
        return fileBuffer.toString()
      }
      default:
        return mockedInputs[name as keyof object]
    }
  })
}

describe('required validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  describe('equals', () => {
    it('should validate a required input when input is not provided', async () => {
      mockInputs('validation-script.yml', {
        /*no input provided*/
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['enabled']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('required but not provided')
      expect(reportElement[0].found).toBeUndefined()
    })
  })
})
