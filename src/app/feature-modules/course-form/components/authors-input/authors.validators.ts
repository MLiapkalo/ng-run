import { AbstractControl, ValidatorFn } from '@angular/forms';

export const minListLength = (min: number): ValidatorFn => (control: AbstractControl) => {
    return control.value.length < min 
        ? { minListLength: min }
        : null
}