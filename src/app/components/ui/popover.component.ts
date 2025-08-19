import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';

@Component({
  selector: 'ui-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <!-- Trigger Element -->
      <div 
        #trigger
        [class]="triggerClasses"
        (click)="onTriggerClick()"
        (mouseenter)="onTriggerMouseEnter()"
        (mouseleave)="onTriggerMouseLeave()"
        (focus)="onTriggerFocus()"
        (blur)="onTriggerBlur()"
        [attr.aria-expanded]="isOpen"
        [attr.aria-haspopup]="true"
      >
        <ng-content select="[slot=trigger]"></ng-content>
      </div>
      
      <!-- Popover Content -->
      <div 
        *ngIf="isOpen"
        #popover
        [class]="popoverClasses"
        [style]="popoverStyles"
        role="dialog"
        [attr.aria-modal]="modal"
      >
        <!-- Arrow -->
        <div *ngIf="showArrow" [class]="arrowClasses"></div>
        
        <!-- Header -->
        <div *ngIf="title || hasHeaderSlot" [class]="headerClasses">
          <h3 *ngIf="title" class="font-semibold text-sm">{{ title }}</h3>
          <ng-content select="[slot=header]"></ng-content>
          
          <!-- Close Button -->
          <button 
            *ngIf="showCloseButton"
            type="button"
            class="absolute top-2 right-2 p-1 rounded-sm hover:bg-accent transition-colors"
            (click)="close()"
            aria-label="Close"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Content -->
        <div [class]="contentClasses">
          <ng-content></ng-content>
        </div>
        
        <!-- Footer -->
        <div *ngIf="hasFooterSlot" [class]="footerClasses">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div 
      *ngIf="isOpen && showBackdrop"
      class="fixed inset-0 z-40 bg-black/20"
      (click)="onBackdropClick()"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {
  @ViewChild('trigger') triggerRef!: ElementRef;
  @ViewChild('popover') popoverRef!: ElementRef;
  
  @Input() isOpen = false;
  @Input() placement: PopoverPlacement = 'bottom';
  @Input() trigger: PopoverTrigger = 'click';
  @Input() title = '';
  @Input() showArrow = true;
  @Input() showCloseButton = false;
  @Input() showBackdrop = false;
  @Input() modal = false;
  @Input() offset = 8;
  @Input() disabled = false;
  @Input() closeOnClickOutside = true;
  @Input() closeOnEscape = true;
  @Input() hasHeaderSlot = false;
  @Input() hasFooterSlot = false;
  
  @Output() openChange = new EventEmitter<boolean>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private hoverTimeout?: number;

  get triggerClasses(): string {
    return 'inline-block cursor-pointer';
  }

  get popoverClasses(): string {
    const baseClasses = 'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95';
    const placementClasses = this.getPlacementClasses();
    
    return `${baseClasses} ${placementClasses}`;
  }

  get popoverStyles(): { [key: string]: string } {
    return this.getPositionStyles();
  }

  get arrowClasses(): string {
    const baseClasses = 'absolute w-2 h-2 bg-popover border transform rotate-45';
    const arrowPosition = this.getArrowPositionClasses();
    
    return `${baseClasses} ${arrowPosition}`;
  }

  get headerClasses(): string {
    return 'relative pb-2 border-b border-border mb-2';
  }

  get contentClasses(): string {
    return 'text-sm';
  }

  get footerClasses(): string {
    return 'pt-2 border-t border-border mt-2';
  }

  private getPlacementClasses(): string {
    switch (this.placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return 'data-[side=top]:slide-in-from-bottom-2';
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return 'data-[side=bottom]:slide-in-from-top-2';
      case 'left':
      case 'left-start':
      case 'left-end':
        return 'data-[side=left]:slide-in-from-right-2';
      case 'right':
      case 'right-start':
      case 'right-end':
        return 'data-[side=right]:slide-in-from-left-2';
      default:
        return 'data-[side=bottom]:slide-in-from-top-2';
    }
  }

  private getPositionStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    switch (this.placement) {
      case 'top':
        styles['bottom'] = '100%';
        styles['left'] = '50%';
        styles['transform'] = 'translateX(-50%)';
        styles['margin-bottom'] = `${this.offset}px`;
        break;
      case 'top-start':
        styles['bottom'] = '100%';
        styles['left'] = '0';
        styles['margin-bottom'] = `${this.offset}px`;
        break;
      case 'top-end':
        styles['bottom'] = '100%';
        styles['right'] = '0';
        styles['margin-bottom'] = `${this.offset}px`;
        break;
      case 'bottom':
        styles['top'] = '100%';
        styles['left'] = '50%';
        styles['transform'] = 'translateX(-50%)';
        styles['margin-top'] = `${this.offset}px`;
        break;
      case 'bottom-start':
        styles['top'] = '100%';
        styles['left'] = '0';
        styles['margin-top'] = `${this.offset}px`;
        break;
      case 'bottom-end':
        styles['top'] = '100%';
        styles['right'] = '0';
        styles['margin-top'] = `${this.offset}px`;
        break;
      case 'left':
        styles['right'] = '100%';
        styles['top'] = '50%';
        styles['transform'] = 'translateY(-50%)';
        styles['margin-right'] = `${this.offset}px`;
        break;
      case 'left-start':
        styles['right'] = '100%';
        styles['top'] = '0';
        styles['margin-right'] = `${this.offset}px`;
        break;
      case 'left-end':
        styles['right'] = '100%';
        styles['bottom'] = '0';
        styles['margin-right'] = `${this.offset}px`;
        break;
      case 'right':
        styles['left'] = '100%';
        styles['top'] = '50%';
        styles['transform'] = 'translateY(-50%)';
        styles['margin-left'] = `${this.offset}px`;
        break;
      case 'right-start':
        styles['left'] = '100%';
        styles['top'] = '0';
        styles['margin-left'] = `${this.offset}px`;
        break;
      case 'right-end':
        styles['left'] = '100%';
        styles['bottom'] = '0';
        styles['margin-left'] = `${this.offset}px`;
        break;
    }
    
    return styles;
  }

  private getArrowPositionClasses(): string {
    switch (this.placement) {
      case 'top':
        return 'top-full left-1/2 -translate-x-1/2 border-t-0 border-r-0';
      case 'top-start':
        return 'top-full left-4 border-t-0 border-r-0';
      case 'top-end':
        return 'top-full right-4 border-t-0 border-r-0';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-0 border-l-0';
      case 'bottom-start':
        return 'bottom-full left-4 border-b-0 border-l-0';
      case 'bottom-end':
        return 'bottom-full right-4 border-b-0 border-l-0';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-0 border-b-0';
      case 'left-start':
        return 'left-full top-4 border-l-0 border-b-0';
      case 'left-end':
        return 'left-full bottom-4 border-l-0 border-b-0';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-0 border-t-0';
      case 'right-start':
        return 'right-full top-4 border-r-0 border-t-0';
      case 'right-end':
        return 'right-full bottom-4 border-r-0 border-t-0';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-0 border-l-0';
    }
  }

  onTriggerClick(): void {
    if (this.disabled || this.trigger !== 'click') return;
    this.toggle();
  }

  onTriggerMouseEnter(): void {
    if (this.disabled || this.trigger !== 'hover') return;
    
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    
    this.open();
  }

  onTriggerMouseLeave(): void {
    if (this.disabled || this.trigger !== 'hover') return;
    
    this.hoverTimeout = window.setTimeout(() => {
      this.close();
    }, 100);
  }

  onTriggerFocus(): void {
    if (this.disabled || this.trigger !== 'focus') return;
    this.open();
  }

  onTriggerBlur(): void {
    if (this.disabled || this.trigger !== 'focus') return;
    
    // Delay to allow clicking inside popover
    setTimeout(() => {
      if (!this.popoverRef?.nativeElement.contains(document.activeElement)) {
        this.close();
      }
    }, 100);
  }

  onBackdropClick(): void {
    if (this.closeOnClickOutside) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen && this.closeOnEscape) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen || !this.closeOnClickOutside) return;
    
    const target = event.target as Element;
    const triggerElement = this.triggerRef?.nativeElement;
    const popoverElement = this.popoverRef?.nativeElement;
    
    if (triggerElement && popoverElement) {
      if (!triggerElement.contains(target) && !popoverElement.contains(target)) {
        this.close();
      }
    }
  }

  open(): void {
    if (this.disabled || this.isOpen) return;
    
    this.isOpen = true;
    this.openChange.emit(true);
    this.opened.emit();
  }

  close(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}