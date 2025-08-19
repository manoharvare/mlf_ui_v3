import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  User,
  CheckCircle,
  BarChart3,
  Eye
} from 'lucide-angular';
import { CardComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent, BadgeVariant } from '../ui/badge.component';
import { InputComponent } from '../ui/input.component';
import { SelectComponent } from '../ui/select.component';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  permissions: string[];
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    InputComponent,
    SelectComponent
  ],
  template: `
    <div class="h-full overflow-auto bg-background">
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex items-center gap-3">
            <lucide-icon [name]="Users" [size]="24" class="text-blue-500"></lucide-icon>
            <div>
              <h2 class="text-xl font-semibold">User Management</h2>
              <p class="text-sm text-muted-foreground">Manage user accounts and permissions</p>
            </div>
          </div>
          
          <ui-button>
            <lucide-icon [name]="Plus" [size]="16" class="mr-2"></lucide-icon>
            Add User
          </ui-button>
        </div>

        <!-- User Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p class="text-2xl font-bold">24</p>
                </div>
                <lucide-icon [name]="Users" [size]="24" class="text-blue-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p class="text-2xl font-bold text-green-600">21</p>
                </div>
                <lucide-icon [name]="CheckCircle" [size]="24" class="text-green-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Pending</p>
                  <p class="text-2xl font-bold text-orange-600">2</p>
                </div>
                <lucide-icon [name]="User" [size]="24" class="text-orange-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Admins</p>
                  <p class="text-2xl font-bold text-purple-600">3</p>
                </div>
                <lucide-icon [name]="Shield" [size]="24" class="text-purple-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
        </div>

        <!-- Filters -->
        <ui-card>
          <div class="p-4">
            <div class="flex flex-wrap gap-4 items-center">
              <div class="relative">
                <lucide-icon [name]="Search" [size]="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></lucide-icon>
                <ui-input placeholder="Search users..." class="pl-9 w-64"></ui-input>
              </div>
              
              <ui-select placeholder="All Roles">
                <option value="">All Roles</option>
                <option value="super-admin">Super Admin</option>
                <option value="mlf-admin">MLF Admin</option>
                <option value="planner">Planner</option>
                <option value="approver">Approver</option>
                <option value="fab-management">Fab Management</option>
                <option value="view-only-user">View Only</option>
              </ui-select>
              
              <ui-select placeholder="All Status">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </ui-select>
            </div>
          </div>
        </ui-card>

        <!-- Users Table -->
        <ui-card>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4">User Accounts</h3>
            
            <div class="border rounded-lg overflow-hidden">
              <table class="w-full">
                <thead class="bg-muted/50">
                  <tr>
                    <th class="text-left p-3 font-medium">User</th>
                    <th class="text-left p-3 font-medium">Role</th>
                    <th class="text-left p-3 font-medium">Status</th>
                    <th class="text-left p-3 font-medium">Last Login</th>
                    <th class="text-left p-3 font-medium">Permissions</th>
                    <th class="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let user of users" class="border-t hover:bg-muted/30">
                    <td class="p-3">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span class="text-sm font-medium">{{ getInitials(user.name) }}</span>
                        </div>
                        <div>
                          <div class="font-medium">{{ user.name }}</div>
                          <div class="text-sm text-muted-foreground">{{ user.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <lucide-icon [name]="getRoleIcon(user.role)" [size]="16" class="text-muted-foreground"></lucide-icon>
                        <span>{{ getRoleDisplayName(user.role) }}</span>
                      </div>
                    </td>
                    <td class="p-3">
                      <ui-badge [variant]="getStatusVariant(user.status)">
                        {{ user.status | titlecase }}
                      </ui-badge>
                    </td>
                    <td class="p-3">
                      <span class="text-sm">{{ user.lastLogin }}</span>
                    </td>
                    <td class="p-3">
                      <span class="text-sm text-muted-foreground">{{ user.permissions.length }} permissions</span>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-1">
                        <ui-button variant="ghost" size="sm">
                          <lucide-icon [name]="Edit" [size]="14"></lucide-icon>
                        </ui-button>
                        <ui-button variant="ghost" size="sm">
                          <lucide-icon [name]="Eye" [size]="14"></lucide-icon>
                        </ui-button>
                        <ui-button variant="ghost" size="sm">
                          <lucide-icon [name]="Trash2" [size]="14"></lucide-icon>
                        </ui-button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ui-card>
      </div>
    </div>
  `
})
export class UserManagementComponent {
  // Icons
  Users = Users;
  Plus = Plus;
  Search = Search;
  Edit = Edit;
  Trash2 = Trash2;
  Shield = Shield;
  UserCheck = UserCheck;
  User = User;
  CheckCircle = CheckCircle;
  BarChart3 = BarChart3;
  Eye = Eye;

  users: UserAccount[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'super-admin',
      status: 'active',
      lastLogin: '2024-01-28 14:30',
      permissions: ['home', 'monthly-forecast', 'master-data-configurations', 'project-configurations', 'manage-mlf-rules', 'mlf-variance-report', 'power-bi-reports', 'user-management']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'mlf-admin',
      status: 'active',
      lastLogin: '2024-01-28 09:15',
      permissions: ['home', 'master-data-configurations', 'project-configurations', 'manage-mlf-rules', 'mlf-variance-report', 'user-management']
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'planner',
      status: 'active',
      lastLogin: '2024-01-27 16:45',
      permissions: ['home', 'monthly-forecast', 'mlf-variance-report', 'power-bi-reports']
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa.chen@company.com',
      role: 'approver',
      status: 'active',
      lastLogin: '2024-01-28 11:20',
      permissions: ['home', 'monthly-forecast', 'forecast-approvals', 'mlf-variance-report', 'power-bi-reports']
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert.wilson@company.com',
      role: 'fab-management',
      status: 'active',
      lastLogin: '2024-01-26 13:10',
      permissions: ['home', 'mlf-variance-report', 'power-bi-reports']
    },
    {
      id: '6',
      name: 'Emily Brown',
      email: 'emily.brown@company.com',
      role: 'view-only-user',
      status: 'pending',
      lastLogin: 'Never',
      permissions: ['home', 'monthly-forecast', 'mlf-variance-report', 'power-bi-reports']
    }
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getRoleIcon(role: string): any {
    const iconMap: { [key: string]: any } = {
      'super-admin': Shield,
      'mlf-admin': UserCheck,
      'planner': User,
      'approver': CheckCircle,
      'fab-management': BarChart3,
      'view-only-user': Eye
    };
    return iconMap[role] || User;
  }

  getRoleDisplayName(role: string): string {
    const nameMap: { [key: string]: string } = {
      'super-admin': 'Super Admin',
      'mlf-admin': 'MLF Admin',
      'planner': 'Planner',
      'approver': 'Approver',
      'fab-management': 'Fab Management',
      'view-only-user': 'View Only'
    };
    return nameMap[role] || role;
  }

  getStatusVariant(status: string): BadgeVariant {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  }
}