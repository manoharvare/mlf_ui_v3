import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Menu,
  Plus,
  Upload,
  Download,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  HelpCircle,
  LucideIconData
} from 'lucide-angular';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { DropdownComponent } from '../ui/dropdown.component';
import { AvatarComponent } from '../ui/avatar.component';
import { BadgeComponent } from '../ui/badge.component';
import { SeparatorComponent } from '../ui/separator.component';
import { UserRole } from '../../models/user-role.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    DropdownComponent,
    AvatarComponent,
    BadgeComponent,
    SeparatorComponent
  ],
  template: `
    <header class="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div class="flex items-center justify-between px-4 h-full">
        
        <!-- Left section -->
        <div class="flex items-center space-x-4">
          <!-- Sidebar toggle -->
          <ui-button 
            variant="ghost" 
            size="sm"
            (clicked)="toggleSidebar.emit()"
            class="p-2"
          >
            <lucide-icon [name]="Menu" [size]="20"></lucide-icon>
            <span class="sr-only">Toggle sidebar</span>
          </ui-button>
          
          <!-- Page title -->
          <div class="hidden sm:block">
            <h1 class="text-lg font-semibold text-foreground">{{ pageTitle }}</h1>
            <p *ngIf="pageSubtitle" class="text-sm text-muted-foreground">{{ pageSubtitle }}</p>
          </div>
        </div>
        
        <!-- Center section - Search (hidden on mobile) -->
        <div class="hidden md:flex flex-1 max-w-md mx-8">
          <ui-input
            placeholder="Search..."
            [leftIcon]="Search"
            class="w-full"
            (valueChange)="search.emit($event)"
          >
          </ui-input>
        </div>
        
        <!-- Right section -->
        <div class="flex items-center space-x-2">
          
          <!-- Quick actions -->
          <div class="hidden sm:flex items-center space-x-1">
            <ui-button 
              variant="ghost" 
              size="sm"
              (clicked)="quickAction.emit('add')"
              class="p-2"
            >
              <lucide-icon [name]="Plus" [size]="16"></lucide-icon>
              <span class="sr-only">Add new</span>
            </ui-button>
            
            <ui-button 
              variant="ghost" 
              size="sm"
              (clicked)="quickAction.emit('upload')"
              class="p-2"
            >
              <lucide-icon [name]="Upload" [size]="16"></lucide-icon>
              <span class="sr-only">Upload</span>
            </ui-button>
            
            <ui-button 
              variant="ghost" 
              size="sm"
              (clicked)="quickAction.emit('download')"
              class="p-2"
            >
              <lucide-icon [name]="Download" [size]="16"></lucide-icon>
              <span class="sr-only">Download</span>
            </ui-button>
          </div>
          
          <ui-separator orientation="vertical" class="h-6 hidden sm:block"></ui-separator>
          
          <!-- Notifications -->
          <ui-button 
            variant="ghost" 
            size="sm"
            (clicked)="notifications.emit()"
            class="p-2 relative"
          >
            <lucide-icon [name]="Bell" [size]="16"></lucide-icon>
            <ui-badge 
              *ngIf="notificationCount > 0"
              variant="destructive" 
              class="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              {{ notificationCount > 99 ? '99+' : notificationCount }}
            </ui-badge>
            <span class="sr-only">Notifications</span>
          </ui-button>
          
          <!-- Help -->
          <ui-button 
            variant="ghost" 
            size="sm"
            (clicked)="help.emit()"
            class="p-2"
          >
            <lucide-icon [name]="HelpCircle" [size]="16"></lucide-icon>
            <span class="sr-only">Help</span>
          </ui-button>
          
          <!-- User menu -->
          <ui-dropdown>
            <ui-button 
              variant="ghost" 
              size="sm"
              class="flex items-center space-x-2 px-2 py-1"
            >
              <ui-avatar size="sm">
                <div class="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                  <lucide-icon [name]="User" [size]="16" class="text-primary"></lucide-icon>
                </div>
              </ui-avatar>
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium">{{ currentUser?.name || 'User' }}</p>
                <p class="text-xs text-muted-foreground">{{ getRoleDisplayName() }}</p>
              </div>
              <lucide-icon [name]="ChevronDown" [size]="16" class="text-muted-foreground"></lucide-icon>
            </ui-button>
            
            <!-- Dropdown content -->
            <div slot="content" class="w-56">
              <div class="px-3 py-2 border-b">
                <p class="text-sm font-medium">{{ currentUser?.name || 'User' }}</p>
                <p class="text-xs text-muted-foreground">{{ currentUser?.id || 'user@example.com' }}</p>
              </div>
              
              <div class="py-1">
                <button 
                  class="flex items-center w-full px-3 py-2 text-sm hover:bg-muted"
                  (click)="userAction.emit('profile')"
                >
                  <lucide-icon [name]="User" [size]="16" class="mr-3"></lucide-icon>
                  Profile
                </button>
                
                <button 
                  class="flex items-center w-full px-3 py-2 text-sm hover:bg-muted"
                  (click)="userAction.emit('settings')"
                >
                  <lucide-icon [name]="Settings" [size]="16" class="mr-3"></lucide-icon>
                  Settings
                </button>
                
                <div class="border-t my-1"></div>
                
                <!-- Role switcher -->
                <div *ngIf="availableRoles && availableRoles.length > 1" class="px-3 py-2">
                  <p class="text-xs font-medium text-muted-foreground mb-2">Switch Role</p>
                  <div class="space-y-1">
                    <button
                      *ngFor="let role of availableRoles"
                      class="flex items-center w-full px-2 py-1 text-sm rounded hover:bg-muted"
                      [class.bg-muted]="currentUser?.id === role.id"
                      (click)="roleChange.emit(role)"
                    >
                      <div class="w-2 h-2 rounded-full mr-2"
                           [class.bg-primary]="currentUser?.id === role.id"
                           [class.bg-muted-foreground]="currentUser?.id !== role.id">
                      </div>
                      {{ role.name }}
                    </button>
                  </div>
                </div>
                
                <div class="border-t my-1"></div>
                
                <button 
                  class="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                  (click)="userAction.emit('logout')"
                >
                  <lucide-icon [name]="LogOut" [size]="16" class="mr-3"></lucide-icon>
                  Sign out
                </button>
              </div>
            </div>
          </ui-dropdown>
          
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Input() pageTitle = '';
  @Input() pageSubtitle = '';
  @Input() currentUser: UserRole | null = null;
  @Input() availableRoles: UserRole[] = [];
  @Input() notificationCount = 0;
  
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  @Output() quickAction = new EventEmitter<string>();
  @Output() notifications = new EventEmitter<void>();
  @Output() help = new EventEmitter<void>();
  @Output() userAction = new EventEmitter<string>();
  @Output() roleChange = new EventEmitter<UserRole>();
  
  // Icons
  Menu = Menu;
  Plus = Plus;
  Upload = Upload;
  Download = Download;
  Search = Search;
  Bell = Bell;
  Settings = Settings;
  User = User;
  LogOut = LogOut;
  ChevronDown = ChevronDown;
  HelpCircle = HelpCircle;
  
  roleDisplayNames: { [key: string]: string } = {
    'super-admin': 'Super Admin',
    'mlf-admin': 'MLF Admin',
    'planner': 'Planner',
    'approver': 'Approver',
    'fab-management': 'Fab Management',
    'view-only-user': 'View Only'
  };
  
  getRoleDisplayName(): string {
    return this.currentUser?.id 
      ? this.roleDisplayNames[this.currentUser.id] || this.currentUser.id 
      : 'User';
  }
}