import {AbstractValidator} from "./abstract-validator";
import {AbstractVerifier} from "../verifications/abstract-verifier";
import {BooleanVerifierImpl} from "../verifications/boolean-verifier-impl";

export class BooleanValidator extends AbstractValidator {

    verifications(): AbstractVerifier[] {
        return [
            new BooleanVerifierImpl()
        ];
    }
}