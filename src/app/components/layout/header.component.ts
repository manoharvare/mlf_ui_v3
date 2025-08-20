import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Menu,
  PanelLeftClose,
  ChevronDown,
  Check
} from 'lucide-angular';
import { UserRole } from '../../models/user-role.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  template: `
    <div class="bg-white border-b border-border px-8 py-6" 
         [style.background-color]="'var(--header-background)'"
         [style.color]="'var(--header-foreground)'">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Sidebar toggle (only show if onToggleSidebar is provided) -->
          <button
            *ngIf="showSidebarToggle"
            (click)="toggleSidebar.emit()"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-muted/50 h-8 px-3"
          >
            <lucide-icon 
              [name]="isSidebarCollapsed ? Menu : PanelLeftClose" 
              [size]="20"
            ></lucide-icon>
          </button>
          
          <div>
            <h1 [style.color]="'var(--header-foreground)'">{{ title }}</h1>
            <p *ngIf="subtitle" class="text-muted-foreground mt-1">{{ subtitle }}</p>
          </div>
        </div>

        <!-- Right side - User Role Dropdown -->
        <div class="flex items-center gap-3">
          <!-- User Role Dropdown -->
          <div *ngIf="currentUser && availableRoles && availableRoles.length > 0" class="relative">
            <button
              (click)="toggleDropdown()"
              class="flex items-center gap-2 hover:bg-gray-50 rounded-md px-2 py-1 cursor-pointer transition-colors"
            >
              <div class="w-6 h-6 bg-[#D9DBE9] rounded-full flex items-center justify-center">
                <span 
                  class="text-black text-xs font-medium"
                  style="font-family: Roboto, sans-serif"
                >
                  {{ getUserInitials() }}
                </span>
              </div>
              <div class="flex flex-col items-start">
                <span 
                  class="text-gray-700 text-xs leading-tight"
                  style="font-family: Roboto, sans-serif"
                >
                  {{ currentUser.name }}
                </span>
                <span 
                  *ngIf="currentUser.isReadOnly"
                  class="text-orange-600 text-[10px] leading-tight"
                  style="font-family: Roboto, sans-serif"
                >
                  Read-Only
                </span>
              </div>
              <lucide-icon [name]="ChevronDown" [size]="12" class="text-gray-500"></lucide-icon>
            </button>
            
            <!-- Dropdown content -->
            <div 
              *ngIf="isDropdownOpen()"
              class="absolute right-0 top-full mt-1 w-64 bg-white border border-border rounded-md shadow-md z-50"
            >
              <div class="text-sm font-medium p-3 border-b">Switch Role</div>
              <div class="py-1">
                <button
                  *ngFor="let role of availableRoles"
                  (click)="onRoleChange(role)"
                  class="flex items-center gap-3 p-3 cursor-pointer w-full hover:bg-gray-50 transition-colors text-left"
                >
                  <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
                    <lucide-icon [name]="role.icon || 'User'" [size]="16"></lucide-icon>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-sm">{{ role.name }}</span>
                      <lucide-icon 
                        *ngIf="isSelectedRole(role)" 
                        [name]="Check" 
                        [size]="16" 
                        class="text-green-600"
                      ></lucide-icon>
                    </div>
                    <p class="text-xs text-gray-500 line-clamp-2">
                      {{ role.description }}
                    </p>
                    <span 
                      *ngIf="role.isReadOnly" 
                      class="text-xs text-orange-600 font-medium"
                    >
                      Read-Only Access
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Backdrop to close dropdown -->
    <div 
      *ngIf="isDropdownOpen()"
      class="fixed inset-0 z-40"
      (click)="closeDropdown()"
    ></div>
  `
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() currentUser: UserRole | null = null;
  @Input() availableRoles: UserRole[] = [];
  @Input() isSidebarCollapsed = false;
  @Input() showSidebarToggle = false;
  
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() roleChange = new EventEmitter<UserRole>();
  
  // Dropdown state
  dropdownOpen = signal(false);
  
  // Icons
  Menu = Menu;
  PanelLeftClose = PanelLeftClose;
  ChevronDown = ChevronDown;
  Check = Check;
  
  getUserInitials(): string {
    if (!this.currentUser?.name) return 'U';
    return this.currentUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
  
  isSelectedRole(role: UserRole): boolean {
    return this.currentUser?.id === role.id;
  }
  
  onRoleChange(role: UserRole): void {
    this.roleChange.emit(role);
    this.closeDropdown();
  }
  
  toggleDropdown(): void {
    this.dropdownOpen.update(open => !open);
  }
  
  closeDropdown(): void {
    this.dropdownOpen.set(false);
  }
  
  isDropdownOpen(): boolean {
    return this.dropdownOpen();
  }
}