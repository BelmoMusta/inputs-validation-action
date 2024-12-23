import { computeSummary } from '../../src/summary'
import * as validationScript from '../../src/get-validation-script'
import * as core from '@actions/core'
import mock = jest.mock

mock('../../src/get-validation-script')
mock('@actions/core')
describe('Summary', () => {
  it('should produce a summary', async () => {
    const spyAddHeading = jest.spyOn(core.summary, 'addHeading')
    const spyAddTable = jest.spyOn(core.summary, 'addTable')
    const spyWrite = jest
      .spyOn(core.summary, 'write')
      .mockImplementation(args => {
        return Promise.resolve({} as any)
      })
    jest.spyOn(validationScript, 'getValidationScript').mockReturnValue({
      'input-a': {
        type: 'string',
        'not-blank': true
      }
    })
    const validationReport = {
      'input-a': [
        {
          message: 'should be provided',
          found: '<empty>'
        }
      ]
    }
    await computeSummary(validationReport)
    expect(spyAddHeading).toHaveBeenCalledWith('Input Validation Result')
    expect(spyAddTable).toHaveBeenCalledWith([
      [
        { data: 'input name', header: true },
        { data: 'type', header: true },
        { data: 'valid', header: true }
      ],
      ['input-a', 'string', '❌']
    ])
    expect(spyWrite).toHaveBeenCalled()
  })
})
