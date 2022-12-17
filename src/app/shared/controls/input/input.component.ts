import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder = '';
  @Output() changed = new EventEmitter<string>();


  value = '';
  isDisabled = false;
  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};


  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // when the user insert value
  onKeyup(event: Event): void {
    const {target} = event;
    this.value = (target as HTMLInputElement).value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  // when the user leaves the text
  onBlur(): void{
    this.propagateTouched();
  }
}
