import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from '../../models/user-role.model';
import { 
  LucideAngularModule,
  Menu,
  Home,
  BarChart3,
  Database,
  Settings,
  FileText,
  CheckSquare,
  BookOpen,
  PieChart,
  Users,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Edit,
  Upload,
  Download,
  MoreHorizontal,
  Settings2,
  MapPin,
  Building2,
  Flag,
  Briefcase
} from 'lucide-angular';

@Component({
  selector: 'app-mlf-application',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './mlf-application.component.html',
  styleUrl: './mlf-application.component.css'
})
export class MlfApplicationComponent implements OnInit {
  activeItem = signal<string>('home');
  currentProjectId = signal<string | null>(null);
  isSidebarCollapsed = signal<boolean>(false);
  
  currentUser = signal<UserRole | null>(null);
  availableRoles = signal<UserRole[]>([]);
  
  // Page configuration
  pageConfig: any = {
    'home': {
      title: 'MLF Dashboard',
      subtitle: 'Overview of recent activities, approval summaries, and key MLF metrics to help you monitor system performance and track forecast progress'
    },
    'master-data-configurations': {
      title: 'Master Data Configurations',
      subtitle: 'Set up and maintain foundational data including Global Activity Codes, Standard Craft definitions, work breakdown structures, and reference tables used across all MLF calculations'
    },
    'project-configurations': {
      title: 'Project Setup & Config',
      subtitle: 'Create, configure, and manage individual project datasets including P6 data import, activity mapping, craft assignments, and project-specific parameters for accurate labor forecasting'
    },
    'monthly-forecast': {
      title: 'Monthly Forecast',
      subtitle: 'Generate and review monthly labor forecasts using hierarchical tree structures, apply business rules, and create detailed workforce predictions by craft, activity, and time period'
    },
    'forecast-approvals': {
      title: 'Forecast Approvals',
      subtitle: 'Review, validate, and approve submitted monthly labor forecasts with detailed comparison views, approval workflows, and commentary tracking for audit trails'
    },
    'manage-mlf-rules': {
      title: 'Manage MLF Rules',
      subtitle: 'Create and configure business rules that govern MLF calculations including P6 to L4 breakdowns, task mapping logic, variance calculations, and automated forecast adjustments'
    },
    'mlf-variance-report': {
      title: 'MLF Variance Report',
      subtitle: 'Analyze differences between forecasted and actual labor hours with detailed variance breakdowns by project, craft, time period, and organizational hierarchy for performance insights'
    },
    'power-bi-reports': {
      title: 'Power BI Reports',
      subtitle: 'Access comprehensive analytics dashboards and executive reports with interactive visualizations, trend analysis, and data export capabilities for strategic decision making'
    },
    'user-management': {
      title: 'User Management',
      subtitle: 'Manage user accounts, role assignments, and access permissions across the MLF system with support for hierarchical approval workflows and audit logging'
    }
  };

  // Icon references for template
  Menu = Menu;
  Home = Home;
  BarChart3 = BarChart3;
  Database = Database;
  Settings = Settings;
  FileText = FileText;
  CheckSquare = CheckSquare;
  BookOpen = BookOpen;
  PieChart = PieChart;
  Users = Users;
  ChevronDown = ChevronDown;
  ChevronRight = ChevronRight;
  ChevronLeft = ChevronLeft;
  Plus = Plus;
  Trash2 = Trash2;
  Edit = Edit;
  Upload = Upload;
  Download = Download;
  MoreHorizontal = MoreHorizontal;
  Settings2 = Settings2;
  MapPin = MapPin;
  Building2 = Building2;
  Flag = Flag;
  Briefcase = Briefcase;

  // Icon mapping for menu items
  menuIcons: { [key: string]: any } = {
    'home': Home,
    'master-data-configurations': Database,
    'project-configurations': Settings,
    'monthly-forecast': FileText,
    'forecast-approvals': CheckSquare,
    'manage-mlf-rules': BookOpen,
    'mlf-variance-report': BarChart3,
    'power-bi-reports': PieChart,
    'user-management': Users
  };

  constructor(private userRoleService: UserRoleService) {
    this.currentUser.set(this.userRoleService.getCurrentUserRole()());
    this.availableRoles.set(this.userRoleService.getAvailableRoles()());
  }

  ngOnInit(): void {
    // Ensure the active item is allowed for the current user
    this.checkActiveItemPermission();
  }

  private checkActiveItemPermission(): void {
    const user = this.currentUser();
    if (user && !user.permissions.includes(this.activeItem())) {
      // Find the first available page the user has access to
      const availablePage = user.permissions.find(permission => 
        Object.keys(this.pageConfig).includes(permission)
      );
      if (availablePage) {
        this.activeItem.set(availablePage);
      }
    }
  }

  handleItemSelect(item: string): void {
    this.activeItem.set(item);
    if (item !== 'project-configurations') {
      this.currentProjectId.set(null);
    }
  }

  handleNavigateToProjectDetails(projectId: string): void {
    this.currentProjectId.set(projectId);
  }

  handleBackToProjectList(): void {
    this.currentProjectId.set(null);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(value => !value);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();
      this.toggleSidebar();
    }
  }

  onRoleChange(role: UserRole): void {
    this.userRoleService.setCurrentUserRole(role);
    this.checkActiveItemPermission();
  }

  getCurrentPageTitle(): string {
    const activeItem = this.activeItem();
    const currentProjectId = this.currentProjectId();
    
    if (activeItem === 'project-configurations' && currentProjectId) {
      return `Project ${this.getProjectNumber()} Dataset Details`;
    }
    
    return this.pageConfig[activeItem]?.title || '';
  }

  getCurrentPageSubtitle(): string {
    const activeItem = this.activeItem();
    const currentProjectId = this.currentProjectId();
    
    if (activeItem === 'project-configurations' && currentProjectId) {
      return `Detailed dataset analysis and management for Project ${this.getProjectNumber()}`;
    }
    
    return this.pageConfig[activeItem]?.subtitle || '';
  }

  getIconForMenuItem(item: string): any {
    return this.menuIcons[item] || this.Home;
  }

  getProjectNumber(): string {
    const currentProjectId = this.currentProjectId();
    if (!currentProjectId) return '1';
    
    const parts = currentProjectId.split('-');
    return parts.length > 1 ? parts[1] : '1';
  }
}