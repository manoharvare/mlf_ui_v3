import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from '../../models/user-role.model';
import { SidebarComponent } from '../layout/sidebar.component';
import { HeaderComponent } from '../layout/header.component';

@Component({
  selector: 'app-mlf-application',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent
  ],
  template: `
    <div class="flex h-screen bg-background">
      <!-- Sidebar -->
      <app-sidebar
        [isCollapsed]="isSidebarCollapsed()"
        [activeItem]="activeItem()"
        [currentUser]="currentUser()"
        (toggleSidebar)="toggleSidebar()"
        (navigate)="handleNavigate($event)"
      ></app-sidebar>
      
      <!-- Main content area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <app-header
          [pageTitle]="getCurrentPageTitle()"
          [pageSubtitle]="getCurrentPageSubtitle()"
          [currentUser]="currentUser()"
          [availableRoles]="availableRoles()"
          [notificationCount]="8"
          (toggleSidebar)="toggleSidebar()"
          (search)="handleSearch($event)"
          (quickAction)="handleQuickAction($event)"
          (notifications)="handleNotifications()"
          (help)="handleHelp()"
          (userAction)="handleUserAction($event)"
          (roleChange)="handleRoleChange($event)"
        ></app-header>
        
        <!-- Page content -->
        <main class="flex-1 overflow-auto">
          <!-- Page content placeholder -->
          <div class="p-6">
            <div class="bg-card rounded-lg border p-6">
              <h2 class="text-xl font-semibold mb-4">{{ getCurrentPageTitle() }}</h2>
              <p class="text-muted-foreground mb-6">
                {{ getCurrentPageSubtitle() }}
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div class="bg-muted/50 rounded-lg p-4">
                  <h3 class="font-medium mb-2">Quick Stats</h3>
                  <p class="text-sm text-muted-foreground">Current user: {{ currentUser()?.name || 'User' }}</p>
                  <p class="text-sm text-muted-foreground">Role: {{ getRoleDisplayName() }}</p>
                  <p class="text-sm text-muted-foreground">Active page: {{ activeItem() }}</p>
                </div>
                
                <div class="bg-muted/50 rounded-lg p-4">
                  <h3 class="font-medium mb-2">Permissions</h3>
                  <p class="text-sm text-muted-foreground">
                    {{ currentUser()?.permissions?.length || 0 }} accessible pages
                  </p>
                </div>
                
                <div class="bg-muted/50 rounded-lg p-4">
                  <h3 class="font-medium mb-2">Navigation</h3>
                  <p class="text-sm text-muted-foreground">
                    Sidebar {{ isSidebarCollapsed() ? 'collapsed' : 'expanded' }}
                  </p>
                </div>
              </div>
              
              <div class="flex space-x-3">
                <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
                <button class="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styleUrl: './mlf-application.component.css'
})
export class MlfApplicationComponent implements OnInit {
  activeItem = signal<string>('home');
  isSidebarCollapsed = signal<boolean>(false);
  currentUser = signal<UserRole | null>(null);
  availableRoles = signal<UserRole[]>([]);
  
  // Page configuration
  pageConfig: { [key: string]: { title: string; subtitle: string } } = {
    'home': {
      title: 'MLF Dashboard',
      subtitle: 'Overview of recent activities, approval summaries, and key MLF metrics'
    },
    'monthly-forecast': {
      title: 'Monthly Forecast',
      subtitle: 'Create and manage monthly labor forecasts for your projects'
    },
    'master-data-configurations': {
      title: 'Master Data Configurations',
      subtitle: 'Set up and maintain foundational data including Global Activity Codes and Standard Craft definitions'
    },
    'project-configurations': {
      title: 'Project Setup & Config',
      subtitle: 'Configure project settings, hierarchies, and data mappings'
    },
    'manage-mlf-rules': {
      title: 'Manage MLF Rules',
      subtitle: 'Define and maintain business rules for labor forecasting calculations'
    },
    'forecast-approvals': {
      title: 'Forecast Approvals',
      subtitle: 'Review and approve submitted forecasts and variance reports'
    },
    'mlf-variance-report': {
      title: 'MLF Variance Report',
      subtitle: 'Analyze variances between forecasted and actual labor hours'
    },
    'power-bi-reports': {
      title: 'Power BI Reports',
      subtitle: 'Access integrated Power BI dashboards and analytics'
    },
    'user-management': {
      title: 'User Management',
      subtitle: 'Manage user accounts, roles, and permissions'
    }
  };
  
  constructor(
    private userRoleService: UserRoleService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Set up effect to watch for user role changes
    effect(() => {
      const user = this.userRoleService.getCurrentUserRole()();
      this.currentUser.set(user);
      this.checkActiveItemPermission();
    });
    
    // Get available roles
    this.availableRoles.set(this.userRoleService.getAvailableRoles()());
  }
  
  private checkActiveItemPermission(): void {
    const user = this.currentUser();
    if (user && !user.permissions.includes(this.activeItem())) {
      // If current active item is not in user permissions, switch to first available
      const availablePage = user.permissions.find(permission => 
        Object.keys(this.pageConfig).includes(permission)
      );
      if (availablePage) {
        this.activeItem.set(availablePage);
      }
    }
  }
  
  toggleSidebar(): void {
    this.isSidebarCollapsed.update(value => !value);
  }
  
  handleNavigate(page: string): void {
    this.activeItem.set(page);
  }
  
  handleSearch(query: string): void {
    console.log('Search:', query);
    // Implement search functionality
  }
  
  handleQuickAction(action: string): void {
    console.log('Quick action:', action);
    // Implement quick actions
  }
  
  handleNotifications(): void {
    console.log('Show notifications');
    // Implement notifications
  }
  
  handleHelp(): void {
    console.log('Show help');
    // Implement help functionality
  }
  
  handleUserAction(action: string): void {
    console.log('User action:', action);
    if (action === 'logout') {
      this.userRoleService.clearCurrentUserRole();
      this.router.navigate(['/login']);
    }
    // Implement other user actions
  }
  
  handleRoleChange(role: UserRole): void {
    this.userRoleService.setCurrentUserRole(role);
  }
  
  getCurrentPageTitle(): string {
    return this.pageConfig[this.activeItem()]?.title || '';
  }
  
  getCurrentPageSubtitle(): string {
    return this.pageConfig[this.activeItem()]?.subtitle || '';
  }
  
  getRoleDisplayName(): string {
    const roleDisplayNames: { [key: string]: string } = {
      'super-admin': 'Super Admin',
      'mlf-admin': 'MLF Admin',
      'planner': 'Planner',
      'approver': 'Approver',
      'fab-management': 'Fab Management',
      'view-only-user': 'View Only'
    };
    
    return this.currentUser()?.id 
      ? roleDisplayNames[this.currentUser()!.id] || this.currentUser()!.id 
      : 'User';
  }
}