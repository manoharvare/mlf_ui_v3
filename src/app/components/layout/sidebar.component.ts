import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Home,
  BarChart3,
  Database,
  Settings,
  FileText,
  CheckSquare,
  BookOpen,
  PieChart,
  Users,
  ChevronLeft,
  ChevronRight,
  Settings2,
  LucideIconData
} from 'lucide-angular';
import { ButtonComponent } from '../ui/button.component';
import { SeparatorComponent } from '../ui/separator.component';
import { AvatarComponent } from '../ui/avatar.component';
import { BadgeComponent } from '../ui/badge.component';
import { TooltipComponent } from '../ui/tooltip.component';
import { CollapsibleComponent } from '../ui/collapsible.component';
import { UserRole } from '../../models/user-role.model';

interface NavigationItem {
  id: string;
  title: string;
  icon: any;
  permissions: string[];
  badge?: string;
  children?: NavigationItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    SeparatorComponent,
    AvatarComponent,
    BadgeComponent,
    TooltipComponent,
    CollapsibleComponent
  ],
  template: `
    <div class="h-full transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0" 
         [class.w-0]="isCollapsed" 
         [class.w-80]="!isCollapsed">
      
      <!-- Sidebar content -->
      <div *ngIf="!isCollapsed" class="h-full bg-sidebar text-sidebar-foreground flex flex-col">
        
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-sidebar-border/30">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span class="text-primary-foreground font-bold text-sm">MLF</span>
            </div>
            <h2 class="text-lg font-semibold">MLF Application</h2>
          </div>
          <ui-button 
            variant="ghost" 
            size="sm"
            (clicked)="toggleSidebar.emit()"
            class="p-1 h-8 w-8"
          >
            <lucide-icon [name]="ChevronLeft" [size]="16"></lucide-icon>
          </ui-button>
        </div>
        
        <!-- User info -->
        <div class="p-4 border-b border-sidebar-border/30">
          <div class="flex items-center space-x-3">
            <ui-avatar size="md" class="flex-shrink-0">
              <div class="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                <lucide-icon [name]="Users" [size]="20" class="text-primary"></lucide-icon>
              </div>
            </ui-avatar>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-sm truncate">{{ currentUser?.name || 'User' }}</p>
              <p class="text-xs text-sidebar-foreground/70 truncate">{{ currentUser?.id || 'user@example.com' }}</p>
              <ui-badge variant="secondary" class="mt-1 text-xs">
                {{ getRoleDisplayName(currentUser?.id) }}
              </ui-badge>
            </div>
          </div>
        </div>
        
        <!-- Navigation -->
        <div class="flex-1 overflow-y-auto p-2">
          <nav class="space-y-1">
            <ng-container *ngFor="let item of getVisibleNavigationItems(); trackBy: trackByItemId">
              
              <!-- Simple navigation item -->
              <div *ngIf="!item.children" 
                   class="group relative">
                <ui-button
                  variant="ghost"
                  size="sm"
                  [class]="getNavItemClasses(item.id)"
                  (clicked)="navigate.emit(item.id)"
                  class="w-full justify-start px-3 py-2 h-auto"
                >
                  <lucide-icon [name]="item.icon" [size]="16" class="mr-3 flex-shrink-0"></lucide-icon>
                  <span class="truncate">{{ item.title }}</span>
                  <ui-badge *ngIf="item.badge" variant="secondary" class="ml-auto text-xs">
                    {{ item.badge }}
                  </ui-badge>
                </ui-button>
              </div>
              
              <!-- Collapsible navigation item with children -->
              <ui-collapsible *ngIf="item.children" class="space-y-1">
                <ui-button
                  variant="ghost"
                  size="sm"
                  class="w-full justify-start px-3 py-2 h-auto"
                  [class]="getNavItemClasses(item.id)"
                >
                  <lucide-icon [name]="item.icon" [size]="16" class="mr-3 flex-shrink-0"></lucide-icon>
                  <span class="truncate">{{ item.title }}</span>
                  <lucide-icon [name]="ChevronRight" [size]="16" class="ml-auto transition-transform group-data-[state=open]:rotate-90"></lucide-icon>
                </ui-button>
                
                <div class="ml-6 space-y-1">
                  <ui-button
                    *ngFor="let child of item.children"
                    variant="ghost"
                    size="sm"
                    [class]="getNavItemClasses(child.id)"
                    (clicked)="navigate.emit(child.id)"
                    class="w-full justify-start px-3 py-1 h-auto text-sm"
                  >
                    <lucide-icon [name]="child.icon" [size]="12" class="mr-3 flex-shrink-0"></lucide-icon>
                    <span class="truncate">{{ child.title }}</span>
                  </ui-button>
                </div>
              </ui-collapsible>
              
            </ng-container>
          </nav>
        </div>
        
        <!-- Footer -->
        <div class="p-4 border-t border-sidebar-border/30">
          <div class="flex items-center justify-between text-xs text-sidebar-foreground/70">
            <span>MLF v1.0.0</span>
            <ui-button variant="ghost" size="sm" class="p-1 h-6 w-6">
              <lucide-icon [name]="Settings2" [size]="12"></lucide-icon>
            </ui-button>
          </div>
        </div>
        
      </div>
      
      <!-- Collapsed sidebar -->
      <div *ngIf="isCollapsed" class="w-16 h-full bg-sidebar border-r border-sidebar-border/30 flex flex-col items-center py-4">
        <ui-button 
          variant="ghost" 
          size="sm"
          (clicked)="toggleSidebar.emit()"
          class="p-2 h-10 w-10 mb-4"
        >
          <lucide-icon [name]="ChevronRight" [size]="16"></lucide-icon>
        </ui-button>
        
        <div class="space-y-2">
          <ui-tooltip *ngFor="let item of getVisibleNavigationItems()" [content]="item.title">
            <ui-button
              variant="ghost"
              size="sm"
              [class]="getNavItemClasses(item.id)"
              (clicked)="navigate.emit(item.id)"
              class="p-2 h-10 w-10"
            >
              <lucide-icon [name]="item.icon" [size]="16"></lucide-icon>
            </ui-button>
          </ui-tooltip>
        </div>
      </div>
      
    </div>
  `
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() activeItem = 'home';
  @Input() currentUser: UserRole | null = null;
  
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();
  
  // Icons
  Home = Home;
  BarChart3 = BarChart3;
  Database = Database;
  Settings = Settings;
  FileText = FileText;
  CheckSquare = CheckSquare;
  BookOpen = BookOpen;
  PieChart = PieChart;
  Users = Users;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  Settings2 = Settings2;
  
  navigationItems: NavigationItem[] = [
    {
      id: 'home',
      title: 'Dashboard',
      icon: Home,
      permissions: ['home']
    },
    {
      id: 'monthly-forecast',
      title: 'Monthly Forecast',
      icon: FileText,
      permissions: ['monthly-forecast']
    },
    {
      id: 'master-data-configurations',
      title: 'Master Data',
      icon: Database,
      permissions: ['master-data-configurations']
    },
    {
      id: 'project-configurations',
      title: 'Project Setup',
      icon: Settings,
      permissions: ['project-configurations']
    },
    {
      id: 'manage-mlf-rules',
      title: 'MLF Rules',
      icon: BookOpen,
      permissions: ['manage-mlf-rules']
    },
    {
      id: 'forecast-approvals',
      title: 'Approvals',
      icon: CheckSquare,
      permissions: ['forecast-approvals'],
      badge: '8'
    },
    {
      id: 'mlf-variance-report',
      title: 'Variance Report',
      icon: BarChart3,
      permissions: ['mlf-variance-report']
    },
    {
      id: 'power-bi-reports',
      title: 'Power BI Reports',
      icon: PieChart,
      permissions: ['power-bi-reports']
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      permissions: ['user-management']
    }
  ];
  
  roleDisplayNames: { [key: string]: string } = {
    'super-admin': 'Super Admin',
    'mlf-admin': 'MLF Admin',
    'planner': 'Planner',
    'approver': 'Approver',
    'fab-management': 'Fab Management',
    'view-only-user': 'View Only'
  };
  
  getVisibleNavigationItems(): NavigationItem[] {
    if (!this.currentUser?.permissions) {
      return [];
    }
    
    return this.navigationItems.filter(item => 
      item.permissions.some(permission => 
        this.currentUser?.permissions.includes(permission)
      )
    );
  }
  
  getNavItemClasses(itemId: string): string {
    const baseClasses = 'transition-colors';
    const activeClasses = 'bg-sidebar-accent text-sidebar-accent-foreground';
    const inactiveClasses = 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground';
    
    return this.activeItem === itemId 
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  }
  
  getRoleDisplayName(roleId?: string): string {
    return roleId ? this.roleDisplayNames[roleId] || roleId : 'User';
  }
  
  trackByItemId(index: number, item: NavigationItem): string {
    return item.id;
  }
}