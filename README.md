# Inputs Validation Action
This action provides extra validations that complete the GitHub Actions built-in ones.

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

This action will help to add more logic to validate the inputs, according to a `validation-script` mandatory input,
combined with the desired inputs to validate.

Among the added validations there is :

- Number validation : make sure a number is in range for example, or is greater or less than a given value
- Regex validation : test if a string matches a given regular expression
- String behaviors : test if a string is not blank
- ...
- TODO : many others to come

## Example of use

```yaml
      - name: Test Input Validation
        uses: BelmoMusta/inputs-validation-action@main
        with:
          ### MAP ALL THE INPUTS BY PRESERVING THE SAME NAME ###
          input-b: ${{ inputs.input-b }}
          milliseconds: ${{ inputs.milliseconds }}
          time-to-live: ${{ inputs.time-to-live }}
          enabled: ${{ inputs.enabled }}
          
          ### THE VALIDATION SCRIPT IS AN INLINE YAML, FIXME: CAN THIS BE A JSON TOO?
          validation-script: |
            input-b:
              must-be: regex
              value: 'foo\.bar.*' # must be ecma scripts regex
            milliseconds:
              must-be: number
            time-to-live:
              must-be: number
              less-than: 1000
              greater-than: 0
            enabled:
              must-be: boolean
            unknown:
              required: false # should not appear in the report if not valid
              must-be: number
```