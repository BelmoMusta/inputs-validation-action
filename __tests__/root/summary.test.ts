import { computeSummary } from '../../src/summary'
import * as validationScript from '../../src/get-validation-script'
import * as core from '@actions/core'
import mock = jest.mock

mock('../../src/get-validation-script')
mock('@actions/core')
describe('Summary', () => {
  let spyAddHeading: jest.SpyInstance
  let spyAddTable: jest.SpyInstance
  let spyWrite: jest.SpyInstance

  beforeEach(() => {
    spyAddHeading = jest.spyOn(core.summary, 'addHeading')
    spyAddTable = jest.spyOn(core.summary, 'addTable')

    spyWrite = jest.spyOn(core.summary, 'write').mockImplementation(() => {
      return Promise.resolve({} as any) //eslint-disable-line @typescript-eslint/no-explicit-any
      // because the Summary type is not exported from @core library
    })

    jest.spyOn(validationScript, 'getValidationScript').mockReturnValue({
      'input-a': {
        type: 'string',
        'not-blank': true
      }
    })
  })

  it('should produce a summary when all the input are valid', async () => {
    const validationReport = {
      'input-a': [
        {
          expected: 'should be provided',
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
        { data: 'valid', header: true },
        { data: 'expected', header: true },
        { data: 'found', header: true }
      ],
      ['input-a', 'string', '❌', 'should be provided', '<empty>']
    ])
    expect(spyWrite).toHaveBeenCalled()
  })
  it('should produce a summary when at least one input is not valid', async () => {
    const validationReport = {
      'input-a': []
    }
    await computeSummary(validationReport)
    expect(spyAddHeading).toHaveBeenCalledWith('Input Validation Result')
    expect(spyAddTable).toHaveBeenCalledWith([
      [
        { data: 'input name', header: true },
        { data: 'type', header: true },
        { data: 'valid', header: true },
        { data: 'expected', header: true },
        { data: 'found', header: true }
      ],
      ['input-a', 'string', '✅', expect.any(String), expect.any(String)]
    ])
    expect(spyWrite).toHaveBeenCalled()
  })
})
