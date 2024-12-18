# Inputs Validation Action

This action provides extra validations that complete the GitHub Actions built-in
ones.

In the GitHub Actions workflow file, an input can be defined as follows:

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

Among the added validations there is :

- Number validation : make sure a number is in range for example, or is greater
  or less than a given value
- Regex validation : test if a string matches a given regular expression
- String behaviors : test if a string is not blank

## Example of use with an inline yaml script

```yaml
- name: Test Input Validation
  uses: BelmoMusta/inputs-validation-action@v0
  with:
    ### MAP ALL THE INPUTS BY PRESERVING THE SAME NAME ###
    input-b: ${{ inputs.input-b }}
    milliseconds: ${{ inputs.milliseconds }}
    time-to-live: ${{ inputs.time-to-live }}
    enabled: ${{ inputs.enabled }}

    ### THE VALIDATION SCRIPT IS AN INLINE YAML, FIXME: CAN THIS BE A JSON TOO?
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

## Example of use with a yaml provided file

```yaml
- name: Test Input Validation
  uses: BelmoMusta/inputs-validation-action@v0
  with:
    ### MAP ALL THE INPUTS BY PRESERVING THE SAME NAME ###
    input-b: ${{ inputs.input-b }}
    milliseconds: ${{ inputs.milliseconds }}
    time-to-live: ${{ inputs.time-to-live }}
    enabled: ${{ inputs.enabled }}
    
    validation-script-file: validation-script.yml
```
