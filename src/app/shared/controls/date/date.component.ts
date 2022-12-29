import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

// capture the time value
type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

  value!: Value;
  isDisabled!: boolean;

  @Input() placeholder!: string;
  @Input() min!: Date;
  @Input() max!: Date;

  @Output() changed = new EventEmitter<Value>();

  // clouse from date-range
  @Output() closed = new EventEmitter<void>();

  get inputValue(): Date {
    return this.value ? new Date(this.value) : new Date();
  }

  constructor() { }

  ngOnInit(): void {
  }

  private propagateChanged: any = () => {};
  private propagateOnTouched: any = () => {};

  writeValue(value: Value): any {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateOnTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : new Date().getTime();
    this.value = value;
    this.propagateChanged(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateOnTouched();
    this.closed.emit();
  }

}
