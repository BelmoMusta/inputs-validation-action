import * as core from '@actions/core'
import { validateInputs } from '../../src/validate-inputs'
import * as fs from 'node:fs'

let getInputMock: jest.SpiedFunction<typeof core.getInput>

function mockInputs(scriptFileLocation: string, mockedInputs: object) {
  getInputMock.mockImplementation((name: string) => {
    switch (name) {
      case 'validation-script': {
        const fileBuffer = fs.readFileSync(
          '__tests__/string/' + scriptFileLocation,
          'utf8'
        )
        return fileBuffer.toString()
      }
      default:
        return mockedInputs[name as keyof object]
    }
  })
}

describe('string validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  describe('not-blank string', () => {
    it('should validate a not-blank string -- worst case', async () => {
      mockInputs('not-blank-validation-script.yml', { key: '     \n\t ' })
      const validationResult = validateInputs()
      const reportElement = validationResult['key']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('has to be a non blank string')
      expect(reportElement[0].found).toBeUndefined()
    })

    it('should validate a not-blank string when input value is not provided', async () => {
      mockInputs('not-blank-validation-script.yml', { key: undefined })
      const validationResult = validateInputs()
      const reportElement = validationResult['key']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe('has to be a non blank string')
      expect(reportElement[0].found).toBeUndefined()
    })

    it('should validate a not-blank string -- best case', async () => {
      mockInputs('not-blank-validation-script.yml', {
        key: 'a non blank string'
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['key']
      expect(reportElement.length).toEqual(0)
    })
  })

  describe('length of a string', () => {
    it('should validate length for a string', async () => {
      mockInputs('length-validation-script.yml', {
        'working-directory': '/path'
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['working-directory']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(`has to have length '10'`)
      expect(reportElement[0].found).toBe(`${'/path'.length}`)
    })
    it('should validate length for a string -- best case', async () => {
      mockInputs('length-validation-script.yml', {
        'working-directory': '/path/path'
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['working-directory']
      expect(reportElement.length).toEqual(0)
    })
  })

  describe('regex', () => {
    it('should validate a string against a regex', async () => {
      mockInputs('regex-validation-script.yml', { 'input-b': 'not-foo.bar' })
      const validationResult = validateInputs()
      const reportElement = validationResult['input-b']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(
        `has to match the regex '^foo\\.bar.*$'`
      )
      expect(reportElement[0].found).toBe('not-foo.bar')
    })

    it('should validate a string against a regex when input value is not provided', async () => {
      mockInputs('regex-validation-script.yml', { 'input-b': undefined })
      const validationResult = validateInputs()
      const reportElement = validationResult['input-b']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(
        `has to match the regex '^foo\\.bar.*$'`
      )
      expect(reportElement[0].found).toBeUndefined()
    })

    it('should validate a string against a regex -- best case', async () => {
      mockInputs('regex-validation-script.yml', {
        'input-b': 'foo.bar-and.something-else'
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['input-b']
      expect(reportElement.length).toEqual(0)
    })
  })

  describe('equals', () => {
    it('should validate a string that must be equal to another string', async () => {
      mockInputs('equal-validation-script.yml', { 'input-b': 'another value' })
      const validationResult = validateInputs()
      const reportElement = validationResult['input-b']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(`has to be equal to 'this value'`)
      expect(reportElement[0].found).toBe("'another value'")
    })

    it('should validate a string that must be equal to another string when input value is not provided', async () => {
      mockInputs('equal-validation-script.yml', { 'input-b': undefined })
      const validationResult = validateInputs()
      const reportElement = validationResult['input-b']
      expect(reportElement.length).toEqual(1)
      expect(reportElement[0].message).toBe(`has to be equal to 'this value'`)
      expect(reportElement[0].found).toBe('<empty>')
    })

    it('should validate a string against a regex -- best case', async () => {
      mockInputs('regex-validation-script.yml', {
        'input-b': 'foo.bar-and.something-else'
      })
      const validationResult = validateInputs()
      const reportElement = validationResult['input-b']
      expect(reportElement.length).toEqual(0)
    })
  })
})
