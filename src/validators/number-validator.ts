import {AbstractValidator} from "./abstract-validator";
import {NumberEqualsVerifierImpl} from "../verifications/number-equals-verifier-impl";
import {NumberLessThanVerifierImpl} from "../verifications/number-less-than-verifier-impl";
import {NumberGreaterThanVerifierImpl} from "../verifications/number-greater-than-verifier-impl";
import {AbstractVerifier} from "../verifications/abstract-verifier";
import {NumberVerifierImpl} from "../verifications/number-verifier-impl";

export class NumberValidator extends AbstractValidator {

    verifications(): AbstractVerifier[] {
        return [
            new NumberVerifierImpl(),
            new NumberEqualsVerifierImpl(),
            new NumberLessThanVerifierImpl(),
            new NumberGreaterThanVerifierImpl()
        ]
    }
}