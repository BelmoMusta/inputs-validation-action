import * as core from '@actions/core'
import { validateInputs } from '../../src/validate-inputs'
import * as fs from 'node:fs'

let getInputMock: jest.SpiedFunction<typeof core.getInput>

function mockInputs(scriptFileLocation: string, mockedInputs: object) {
  getInputMock.mockImplementation((name: string) => {
    switch (name) {
      case 'validation-script': {
        const fileBuffer = fs.readFileSync(
          '__tests__/boolean/' + scriptFileLocation,
          'utf8'
        )
        return fileBuffer.toString()
      }
      default:
        return mockedInputs[name as keyof object]
    }
  })
}

describe('boolean validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  describe('equals', () => {
    it('should validate a boolean that is equal to a value -- worst case', async () => {
      mockInputs('equals-validation-script.yml', { enabled: 'false' })
      const validationResult = validateInputs()
      const reportElement = validationResult['enabled']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(
        "has to be a boolean with value 'true'"
      )
      expect(reportElement[0].found).toBe("'false'")
    })

    it('should validate a boolean that is equal to a value  when provided value is not a boolean', async () => {
      mockInputs('equals-validation-script.yml', { enabled: 'not-a-boolean' })
      const validationResult = validateInputs()
      const reportElement = validationResult['enabled']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('has to be a boolean')
      expect(reportElement[0].found).toBe("'not-a-boolean'")
    })

    it('should validate a boolean that is equal to a value  when provided value is not a boolean i.e undefined', async () => {
      mockInputs('equals-validation-script.yml', { enabled: undefined })
      const validationResult = validateInputs()
      const reportElement = validationResult['enabled']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('has to be a boolean')
      expect(reportElement[0].found).toBe('<empty>')
    })
  })
})
