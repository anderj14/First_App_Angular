import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {regex, regexErrors} from '@app/shared/utils';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  form!: FormGroup;
  isInline!: boolean;
  regexErrors = regexErrors;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.number)
        ]
      }]
    });
  }

  onPatchValue(): void{
    this.form.patchValue({input: 'ander frias'});
  }

  onSubmit(): void{
    console.log('Button submit pressed');
  }

  organizeElement() {
    this.isInline = !this.isInline;
  }

}
