import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SwitchSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ],
  template: `
    <div class="flex items-center space-x-3">
      <div class="relative">
        <input
          type="checkbox"
          [id]="id"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onSwitchChange($event)"
          (blur)="onTouched()"
          class="sr-only"
        />
        <label
          [for]="id"
          [class]="switchClasses"
          [attr.aria-checked]="checked"
          [attr.aria-disabled]="disabled"
          role="switch"
          tabindex="0"
          (keydown)="onKeyDown($event)"
        >
          <div [class]="thumbClasses"></div>
        </label>
      </div>
      
      <div *ngIf="label || description" class="flex-1 min-w-0">
        <label
          *ngIf="label"
          [for]="id"
          [class]="labelClasses"
        >
          {{ label }}
          <span *ngIf="required" class="text-destructive ml-1">*</span>
        </label>
        <div *ngIf="description" class="mt-1">
          <p class="text-xs text-muted-foreground">{{ description }}</p>
        </div>
      </div>
    </div>
    
    <div *ngIf="helperText && !errorMessage" class="mt-2 text-xs text-muted-foreground">
      {{ helperText }}
    </div>
    <div *ngIf="errorMessage" class="mt-2 text-xs text-destructive">
      {{ errorMessage }}
    </div>
  `
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() id = `switch-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() description = '';
  @Input() size: SwitchSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
  @Input() helperText = '';
  @Input() errorMessage = '';
  
  @Output() checkedChange = new EventEmitter<boolean>();

  checked = false;
  
  private onChange = (value: boolean) => {};
  onTouched = () => {};

  get switchClasses(): string {
    const baseClasses = 'inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    const sizeClasses = this.getSwitchSizeClasses();
    const stateClasses = this.getSwitchStateClasses();
    
    return `${baseClasses} ${sizeClasses} ${stateClasses}`;
  }

  get thumbClasses(): string {
    const baseClasses = 'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform';
    const sizeClasses = this.getThumbSizeClasses();
    const transformClasses = this.getThumbTransformClasses();
    
    return `${baseClasses} ${sizeClasses} ${transformClasses}`;
  }

  get labelClasses(): string {
    const baseClasses = 'text-sm font-medium leading-none cursor-pointer';
    const disabledClasses = this.disabled ? 'text-muted-foreground cursor-not-allowed' : 'text-foreground';
    
    return `${baseClasses} ${disabledClasses}`;
  }

  private getSwitchSizeClasses(): string {
    const sizeMap = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-7 w-13'
    };
    return sizeMap[this.size];
  }

  private getThumbSizeClasses(): string {
    const sizeMap = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };
    return sizeMap[this.size];
  }

  private getThumbTransformClasses(): string {
    if (!this.checked) {
      const translateMap = {
        sm: 'translate-x-0',
        md: 'translate-x-0',
        lg: 'translate-x-0'
      };
      return translateMap[this.size];
    }
    
    const translateMap = {
      sm: 'translate-x-4',
      md: 'translate-x-5',
      lg: 'translate-x-6'
    };
    return translateMap[this.size];
  }

  private getSwitchStateClasses(): string {
    if (this.disabled) {
      return this.checked 
        ? 'bg-muted cursor-not-allowed'
        : 'bg-muted cursor-not-allowed';
    }
    
    if (this.checked) {
      return 'bg-primary hover:bg-primary/90';
    }
    
    if (this.errorMessage) {
      return 'bg-destructive/20 hover:bg-destructive/30';
    }
    
    return 'bg-input hover:bg-accent';
  }

  onSwitchChange(event: Event): void {
    if (this.disabled) return;
    
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.checked = !this.checked;
      
      this.onChange(this.checked);
      this.checkedChange.emit(this.checked);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}