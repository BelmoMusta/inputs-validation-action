# Inputs Validation Action

This action provides extra validations that complete the GitHub Actions built-in
ones.

In the GitHub Actions workflow file, an input can be defined as follows:

_See
[on workflow call inputs](https://docs.github.com/en/enterprise-cloud@latest/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_callinputs)
and
[on workflow dispatch](https://docs.github.com/en/enterprise-cloud@latest/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_dispatchinputs)_

```yaml
inputs:
  # ---
  an-input:
    default: foo.bar
    description: input-b
    type: number
    required: true
```

This action will help to add more logic to validate the inputs, according to a
`validation-script` mandatory input, combined with the desired inputs to
validate.

The validation script can be defined using two ways: via inline script, or via a
provided file (_see examples below_)

The following table describes the available validations:

<table>
 <thead>
        <tr>
            <th>Validation</th>
            <th>Verifications</th>
            <th>Example</th>
            <th>Explanation</th>
        </tr>
    </thead>
<tr><td rowspan="4">Number</td></tr>

<tr>
<td>Equality</td> <td>

```yaml
time-to-live:
  type: number
  equals: 1234
```

</td>
<td>

Fails if the provided input is not a parseable number or does not equal `1234`

</td>
</tr>
<tr>
<td>less-than</td> <td>

```yaml
iterations:
  type: number
  less-than: 21
```

</td>
<td>

Fails if the provided input is not a parseable number or is greater than or
equal `21`

</td>
</tr>
<tr>
<td>greater-than</td> <td>

```yaml
time-to-live:
  type: number
  greater-than: 90
```

</td>
<td>

Fails if the provided input is not a parseable number or is less than or equal
`90`

</td>
</tr>

<tr><td rowspan="5">String</td></tr>
<tr>
<td>Equality</td> <td>

```yaml
input-b:
  type: string
  equals: 'this value'
```

</td>
<td>

Fails if the provided input does not equal `this value`

</td>
</tr><tr>
<td>Regex</td> <td>

```yaml
input-b:
  type: string
  regex: '^foo\.bar.*$'
```

</td>
<td>

Fails if the provided input does not match the regular expression `^foo\.bar.*$`

</td>
</tr>
<tr>
<td>Length</td> <td>

```yaml
working-directory:
  type: string
  length: 10
```

</td>
<td>

Fails if the length of the provided input does not equal `10`

</td>
</tr>
<tr>
<td>Not Blank</td> <td>

```yaml
key:
  type: string
  not-blank: true
```

</td>
<td>

Fails if the provided input is empty or of consecutive blank spaces
(`\n`,`[SPACE]`, `\t`)

</td>
</tr>
<tr>
<td>Boolean</td>
<td>Verify boolean type</td>
<td>

```yaml
key:
  type: string
  not-blank: true
```

</td>
<td>

Fails if the provided input is not `true` nor `false`

</td>
</tr>
</table>

## Example of use with an inline YAML script

```yaml
- name: Test Input Validation
  uses: BelmoMusta/inputs-validation-action@v0
  with:
    ### MAP ALL THE INPUTS BY PRESERVING THE SAME NAME ###
    input-b: ${{ inputs.input-b }}
    milliseconds: ${{ inputs.milliseconds }}
    time-to-live: ${{ inputs.time-to-live }}
    enabled: ${{ inputs.enabled }}

    ### THE VALIDATION SCRIPT IS AN INLINE YAML
    validation-script: |
      input-b:
        type: string
        value: 'foo\.bar.*' # must be ecma scripts regex
      milliseconds:
        type: number
      time-to-live:
        type: number
        less-than: 1000
        greater-than: 0
      enabled:
        type: boolean
      unknown:
        required: false # should not appear in the report if not valid
        type: number
```

## Example of use with a YAML provided file

```yaml
- name: Test Input Validation
  uses: BelmoMusta/inputs-validation-action@v0
  with:
    ### MAP ALL THE INPUTS BY PRESERVING THE SAME NAME ###
    input-b: ${{ inputs.input-b }}
    milliseconds: ${{ inputs.milliseconds }}
    time-to-live: ${{ inputs.time-to-live }}
    enabled: ${{ inputs.enabled }}

    validation-script-file: validation-script.yml # Ensure that this file exists on the mentioned location
```

## Validation output

The action provides an output `validation-result`, containing the validation
rendered message

## Validation summary

The validation process produces a summary in the GitHub Actions interface.

Example :

<h1>Input Validation Result</h1>
<table>
<tr>
<th>input name</th>
<th>type</th>
<th>valid</th>
</tr>

<tr><td>input-b</td><td>string</td><td>✅</td></tr>
<tr><td>milliseconds</td><td>number</td><td>❌</td></tr>
<tr><td>time-to-live</td><td>number</td><td>❌</td></tr>
<tr><td>enabled</td><td>boolean</td><td>❌</td></tr>
</table>
