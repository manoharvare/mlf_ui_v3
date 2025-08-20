import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from '../../models/user-role.model';
import { SidebarComponent } from '../layout/sidebar.component';
import { HeaderComponent } from '../layout/header.component';
import { HomeComponent } from '../pages/home.component';
import { MonthlyForecastComponent } from '../pages/monthly-forecast.component';
import { MasterDataConfigurationsComponent } from '../pages/master-data-configurations.component';
import { ProjectConfigurationsComponent } from '../pages/project-configurations.component';
import { ForecastApprovalsComponent } from '../pages/forecast-approvals.component';
import { ManageMLFRulesComponent } from '../pages/manage-mlf-rules.component';
import { MLFVarianceReportComponent } from '../pages/mlf-variance-report.component';
import { PowerBIReportsComponent } from '../pages/power-bi-reports.component';
import { UserManagementComponent } from '../pages/user-management.component';

@Component({
  selector: 'app-mlf-application',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    MonthlyForecastComponent,
    MasterDataConfigurationsComponent,
    ProjectConfigurationsComponent,
    ForecastApprovalsComponent,
    ManageMLFRulesComponent,
    MLFVarianceReportComponent,
    PowerBIReportsComponent,
    UserManagementComponent
  ],
  template: `
    <div class="flex h-screen bg-background">
      <!-- Sidebar -->
      <app-sidebar
        [activeItem]="activeItem()"
        [currentUser]="currentUser()"
        (navigate)="handleNavigate($event)"
        (onLogout)="handleLogout()"
      ></app-sidebar>
      
      <!-- Main content area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <app-header
          [title]="getCurrentPageTitle()"
          [subtitle]="getCurrentPageSubtitle()"
          [currentUser]="currentUser()"
          [availableRoles]="availableRoles()"
          (roleChange)="handleRoleChange($event)"
        ></app-header>
        
        <!-- Page content -->
        <main class="flex-1 overflow-auto bg-background">
          <!-- Home/Dashboard -->
          <div *ngIf="activeItem() === 'home'">
            <app-home 
              [currentUser]="currentUser()?.name || 'User'"
              (navigate)="handleNavigate($event)"
            ></app-home>
          </div>
          
          <!-- Monthly Forecast -->
          <div *ngIf="activeItem() === 'monthly-forecast'">
            <app-monthly-forecast></app-monthly-forecast>
          </div>
          
          <!-- Master Data Configurations -->
          <div *ngIf="activeItem() === 'master-data-configurations'">
            <app-master-data-configurations></app-master-data-configurations>
          </div>
          
          <!-- Project Configurations -->
          <div *ngIf="activeItem() === 'project-configurations'">
            <app-project-configurations 
              (navigateToDetails)="handleNavigateToProjectDetails($event)"
            ></app-project-configurations>
          </div>
          
          <!-- Forecast Approvals -->
          <div *ngIf="activeItem() === 'forecast-approvals'">
            <app-forecast-approvals></app-forecast-approvals>
          </div>
          
          <!-- Manage MLF Rules -->
          <div *ngIf="activeItem() === 'manage-mlf-rules'">
            <app-manage-mlf-rules></app-manage-mlf-rules>
          </div>
          
          <!-- MLF Variance Report -->
          <div *ngIf="activeItem() === 'mlf-variance-report'">
            <app-mlf-variance-report></app-mlf-variance-report>
          </div>
          
          <!-- Power BI Reports -->
          <div *ngIf="activeItem() === 'power-bi-reports'">
            <app-power-bi-reports></app-power-bi-reports>
          </div>
          
          <!-- User Management -->
          <div *ngIf="activeItem() === 'user-management'">
            <app-user-management></app-user-management>
          </div>
        </main>
      </div>
    </div>
  `,
  styleUrl: './mlf-application.component.css'
})
export class MlfApplicationComponent implements OnInit {
  activeItem = signal<string>('home');
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
  ) {
    // Set up effect to watch for user role changes
    effect(() => {
      const user = this.userRoleService.getCurrentUserRole()();
      this.currentUser.set(user);
      this.checkActiveItemPermission();
    });
  }
  
  ngOnInit(): void {
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
  
  handleNavigate(page: string): void {
    this.activeItem.set(page);
  }
  
  handleLogout(): void {
    this.userRoleService.clearCurrentUserRole();
    this.router.navigate(['/login']);
  }
  
  handleRoleChange(role: UserRole): void {
    this.userRoleService.setCurrentUserRole(role);
  }
  
  handleNavigateToProjectDetails(projectId: string): void {
    console.log('Navigate to project details:', projectId);
    // In a full implementation, this would navigate to project details view
    // For now, we'll just log it
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