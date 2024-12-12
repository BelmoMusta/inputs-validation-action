import * as core from '@actions/core'
import { getValidationResult } from '../src/validate-inputs'
import * as fs from 'node:fs'

let getInputMock: jest.SpiedFunction<typeof core.getInput>

function mockInputsBestCaseScenario() {
  getInputMock.mockImplementation(name => {
    switch (name) {
      case 'validation-script':
        const fileBuffer = fs.readFileSync(
          '__tests__/validation-script.yml',
          'utf8'
        )
        return fileBuffer.toString()
      case 'input-a':
        return 'any random string'
      case 'input-b':
        return 'foo.bar-1234'
      case 'milliseconds':
        return '1234'
      case 'time-to-live':
        return '998'
      case 'enabled':
        return 'true'
      default:
        return ''
    }
  })
}

function mockInputsWorstCaseScenario() {
  getInputMock.mockImplementation(name => {
    switch (name) {
      case 'validation-script':
        const fileBuffer = fs.readFileSync(
          '__tests__/validation-script.yml',
          'utf8'
        )
        return fileBuffer.toString()
      case 'input-a':
        return 'any random string'
      case 'input-b':
        return 'foooooo.bar-1234'
      case 'milliseconds':
        return 'not a number'
      case 'time-to-live':
        return '-20'
      case 'enabled':
        return 'oui'
      default:
        return ''
    }
  })
}

describe('input validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  it('provide a positive result if all inputs are valid', async () => {
    mockInputsBestCaseScenario()
    const validationResult = getValidationResult()
    expect(validationResult.isValid).toBe(true)
  })

  it('provide a negative result if at least one input is not valid', async () => {
    mockInputsWorstCaseScenario()
    const validationResult = getValidationResult()
    expect(validationResult.isValid).toBe(false)

    const renderedItems = []
    renderedItems.push(
      "- Input : 'input-b' has to match the regex 'foo\\.bar.*', but found 'foooooo.bar-1234'"
    )
    renderedItems.push(
      "- Input : 'milliseconds' has to be a number, but found 'not a number'"
    )
    renderedItems.push(
      "- Input : 'time-to-live' has to be a number greater than 0, but found '-20'"
    )
    renderedItems.push(
      "- Input : 'enabled' has to be a boolean, but found 'oui'"
    )

    expect(validationResult.message).toBe(renderedItems.join('\n'))
  })
})
