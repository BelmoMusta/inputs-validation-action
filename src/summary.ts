import { InputValidationReport } from './types'
import { getValidationScript } from './get-validation-script'
import { SummaryTableRow } from '@actions/core/lib/summary'
import * as core from '@actions/core'

export async function computeSummary(
  validationReport: InputValidationReport
): Promise<void> {
  const validationScript = getValidationScript()
  const summaryRows: SummaryTableRow[] = []

  Object.keys(validationScript).forEach(input => {
    const validationScriptElement = validationScript[input]
    const type = `${validationScriptElement.type}`
    const isValid = validationReport[input].length === 0 ? '✅' : '❌'
    const row = [input, type, isValid]
    summaryRows.push(row)
  })

  await core.summary
    .addHeading('Input Validation Result')
    .addTable([
      [
        /* headers */
        { data: 'input name', header: true },
        { data: 'type', header: true },
        { data: 'valid', header: true }
        /*rows*/
      ],
      ...summaryRows
    ])
    .write()
}
