import {AbstractVerifier} from "./abstract-verifier";

export abstract class StringAbstractVerifier extends AbstractVerifier {
    protected lengthOfANonBlankString(value: string | undefined): number {
        return value ? value.trim().length : 0;
    }
    continueOnFailure(): boolean {
        return true
    }
}
