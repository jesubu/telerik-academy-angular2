import { Component, Injectable, ViewChild , forwardRef, Directive, Attribute} from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, NG_VALIDATORS } from '@angular/forms';

const requiredValidatorLogic = (required) => (control) => {
    if (!control.value) return { valid: false }
    return control.value.id && control.value.id !== null ? 
        null : { valid: false };
 };
const Required_VALIDATOR: any = {
   provide: NG_VALIDATORS,
   useExisting: forwardRef(() => RequiredValidator),
   multi: true
 };

@Directive({
     selector: '[isRequired]',
     providers: [Required_VALIDATOR]
})
export class RequiredValidator implements Validator {
    private _validator: any;
    constructor(@Attribute('isRequired') required: boolean) {
        this._validator = requiredValidatorLogic(required);
    }
    validate(c) {
        return this._validator(c);
    }
}

@Component({
  selector: 'form-component',
  template: `
        <div *ngIf="submitted" style="height: 200px">
            Form for {{simpleForm.controls.occupationDDL.value.occupation}} submitted! 
            Thanks, {{simpleForm.controls.name.value}}!
        </div>
        <form [formGroup]="simpleForm" style="height: 200px" *ngIf="!submitted" (ngSubmit)="submit(simpleForm)">
            <kendo-dropdownlist
                isRequired="true"
                formControlName="occupationDDL"
                [(ngModel)]="occupation"
                [defaultItem]="defaultItem"
                [data]="data"
                [valueField]="'id'"
                [textField]="'occupation'"
            ></kendo-dropdownlist>
            <br />
            <input class='k-input' formControlName="name" />
            <span style="color: red" 
                *ngIf="simpleForm.controls.name.invalid && !simpleForm.controls.name.pristine">
                Name is required to be at least 2 characters!
            </span>
            <br />
            <h4>Form is valid? {{simpleForm.valid}}</h4>
            <button [disabled]="simpleForm.invalid" type="submit">Submit</button>
        </form>
  `
})

export class FormComponent {
    public simpleForm = {};
    public submitted = false;

    public data = [
      {occupation: "student", id: 1},
      {occupation: "employee", id: 2},
      {occupation: "trainer", id: 3}      
    ]

    public defaultItem = { occupation: "Please select...", id: null };
    public occupation;

    public submit(form) {
        this.submitted = true;
    }

    constructor() {
        this.simpleForm = new FormGroup({
            'occupationDDL': new FormControl({}, requiredValidatorLogic),
            'name': new FormControl("", Validators.compose([Validators.required, Validators.minLength(2)]))
        })
    }
}

