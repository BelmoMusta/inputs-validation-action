import * as core from '@actions/core'
import { validateInputs } from '../../src/validate-inputs'
import * as fs from 'node:fs'

let getInputMock: jest.SpiedFunction<typeof core.getInput>

function mockInputs(scriptFileLocation: string, mockedInputs: any) {
  getInputMock.mockImplementation(name => {
    switch (name) {
      case 'validation-script':
        const fileBuffer = fs.readFileSync(
          '__tests__/number/' + scriptFileLocation,
          'utf8'
        )
        return fileBuffer.toString()
      default:
        return mockedInputs[name]
    }
  })
}

describe('number validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  describe('equals', () => {
    it('should validate a number that is equal to a value -- worst case', async () => {
      mockInputs('equals-validation-script.yml', { 'time-to-live': '999' })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(
        "has to be a number equal to '1000'"
      )
      expect(reportElement[0].found).toBe('999')
    })

    it('should validate a number when input value is not provided', async () => {
      mockInputs('equals-validation-script.yml', { 'time-to-live': undefined })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('has to be a number')
      expect(reportElement[0].found).toBe('<empty>')
    })

    it('should validate a number that is equal to a value', async () => {
      mockInputs('equals-validation-script.yml', { 'time-to-live': '1000' })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(0)
    })
  })
  describe('less than', () => {
    it('should validate a number that is less than a value -- worst case', async () => {
      mockInputs('less-than-validation-script.yml', { 'time-to-live': '1001' })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(
        "has to be a number less than '1000'"
      )
      expect(reportElement[0].found).toBe('1001')
    })

    it('should validate a number when input value is not provided', async () => {
      mockInputs('less-than-validation-script.yml', {
        'time-to-live': undefined
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('has to be a number')
      expect(reportElement[0].found).toBe('<empty>')
    })

    it('should validate a number that is less than a value', async () => {
      mockInputs('less-than-validation-script.yml', { 'time-to-live': '1000' })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(0)
    })
  })
  describe('greater than', () => {
    it('should validate a number that is greater than a value -- worst case', async () => {
      mockInputs('greater-than-validation-script.yml', { 'time-to-live': '9' })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(
        "has to be a number greater than '10'"
      )
      expect(reportElement[0].found).toBe('9')
    })

    it('should validate a number when input value is not provided', async () => {
      mockInputs('greater-than-validation-script.yml', {
        'time-to-live': undefined
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('has to be a number')
      expect(reportElement[0].found).toBe('<empty>')
    })

    it('should validate a number that is greater than a value', async () => {
      mockInputs('greater-than-validation-script.yml', { 'time-to-live': '11' })
      const validationResult = validateInputs()
      const reportElement = validationResult['time-to-live']
      expect(reportElement.length).toEqual(0)
    })
  })
})
