import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Database,
  Plus,
  Search,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  Settings,
  AlertTriangle,
  MapPin,
  Building2
} from 'lucide-angular';
import { CardComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { BadgeComponent, BadgeVariant } from '../ui/badge.component';
import { SelectComponent } from '../ui/select.component';

interface ProjectRow {
  id: string;
  projectName: string;
  projectSource: 'p6' | 'custom';
  description: string;
  yardLocation: string;
  projectType: 'prospect' | 'booked';
  status: 'active' | 'inactive' | 'hold' | 'canceled';
  workType: 'complete' | 'yard-only';
  hasMLFData: boolean;
}

@Component({
  selector: 'app-project-configurations',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CardComponent,
    ButtonComponent,
    InputComponent,
    BadgeComponent,
    SelectComponent
  ],
  template: `
    <div class="h-full overflow-auto bg-background">
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex items-center gap-3">
            <lucide-icon [name]="Database" [size]="24" class="text-blue-500"></lucide-icon>
            <div>
              <h2 class="text-xl font-semibold">Project Setup & Configuration</h2>
              <p class="text-sm text-muted-foreground">Manage project datasets and configurations</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="Upload" [size]="16" class="mr-2"></lucide-icon>
              Import P6
            </ui-button>
            <ui-button size="sm">
              <lucide-icon [name]="Plus" [size]="16" class="mr-2"></lucide-icon>
              New Project
            </ui-button>
          </div>
        </div>

        <!-- Filters -->
        <ui-card>
          <div class="p-4">
            <div class="flex flex-wrap gap-4 items-center">
              <div class="relative">
                <lucide-icon [name]="Search" [size]="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></lucide-icon>
                <ui-input placeholder="Search projects..." class="pl-9 w-64"></ui-input>
              </div>
              
              <ui-select placeholder="All Locations">
                <option value="">All Locations</option>
                <option value="BFA">BFA - Brownsville</option>
                <option value="JAY">JAY - Jacksonville</option>
                <option value="SAFIRA">SAFIRA - Brazil</option>
                <option value="QFAB">QFAB - Qatar</option>
              </ui-select>
              
              <ui-select placeholder="All Types">
                <option value="">All Types</option>
                <option value="prospect">Prospect</option>
                <option value="booked">Booked</option>
              </ui-select>
              
              <ui-select placeholder="All Status">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="hold">Hold</option>
                <option value="canceled">Canceled</option>
              </ui-select>
            </div>
          </div>
        </ui-card>

        <!-- Projects Table -->
        <ui-card>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Project Datasets</h3>
              <div class="flex items-center gap-2">
                <ui-button variant="outline" size="sm">
                  <lucide-icon [name]="Download" [size]="16" class="mr-2"></lucide-icon>
                  Export
                </ui-button>
              </div>
            </div>
            
            <div class="border rounded-lg overflow-hidden">
              <table class="w-full">
                <thead class="bg-muted/50">
                  <tr>
                    <th class="text-left p-3 font-medium">Project Name</th>
                    <th class="text-left p-3 font-medium">Source</th>
                    <th class="text-left p-3 font-medium">Location</th>
                    <th class="text-left p-3 font-medium">Type</th>
                    <th class="text-left p-3 font-medium">Status</th>
                    <th class="text-left p-3 font-medium">Work Type</th>
                    <th class="text-left p-3 font-medium">MLF Data</th>
                    <th class="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let project of projects" class="border-t hover:bg-muted/30">
                    <td class="p-3">
                      <div>
                        <div class="font-medium">{{ project.projectName }}</div>
                        <div class="text-sm text-muted-foreground">{{ project.description | slice:0:50 }}...</div>
                      </div>
                    </td>
                    <td class="p-3">
                      <ui-badge [variant]="project.projectSource === 'p6' ? 'default' : 'secondary'">
                        {{ project.projectSource === 'p6' ? 'P6 Import' : 'Custom' }}
                      </ui-badge>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <lucide-icon [name]="MapPin" [size]="14" class="text-muted-foreground"></lucide-icon>
                        {{ project.yardLocation }}
                      </div>
                    </td>
                    <td class="p-3">
                      <ui-badge [variant]="project.projectType === 'booked' ? 'success' : 'warning'">
                        {{ project.projectType | titlecase }}
                      </ui-badge>
                    </td>
                    <td class="p-3">
                      <ui-badge [variant]="getStatusVariant(project.status)">
                        {{ project.status | titlecase }}
                      </ui-badge>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <lucide-icon [name]="Building2" [size]="14" class="text-muted-foreground"></lucide-icon>
                        {{ project.workType | titlecase }}
                      </div>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-2">
                        <lucide-icon 
                          [name]="project.hasMLFData ? 'Database' : 'AlertTriangle'" 
                          [size]="14" 
                          [class]="project.hasMLFData ? 'text-green-500' : 'text-orange-500'"
                        ></lucide-icon>
                        <span class="text-sm">{{ project.hasMLFData ? 'Available' : 'Missing' }}</span>
                      </div>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-1">
                        <ui-button variant="ghost" size="sm" (clicked)="onViewProject(project.id)">
                          <lucide-icon [name]="Eye" [size]="14"></lucide-icon>
                        </ui-button>
                        <ui-button variant="ghost" size="sm">
                          <lucide-icon [name]="Edit" [size]="14"></lucide-icon>
                        </ui-button>
                        <ui-button variant="ghost" size="sm">
                          <lucide-icon [name]="Settings" [size]="14"></lucide-icon>
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
export class ProjectConfigurationsComponent {
  @Output() navigateToDetails = new EventEmitter<string>();

  // Icons
  Database = Database;
  Plus = Plus;
  Search = Search;
  Upload = Upload;
  Download = Download;
  Edit = Edit;
  Trash2 = Trash2;
  Eye = Eye;
  Settings = Settings;
  AlertTriangle = AlertTriangle;
  MapPin = MapPin;
  Building2 = Building2;

  projects: ProjectRow[] = [
    {
      id: 'project-1',
      projectName: 'Project Alpha',
      projectSource: 'p6',
      description: 'Comprehensive offshore platform fabrication project with multiple phases',
      yardLocation: 'BFA',
      projectType: 'booked',
      status: 'active',
      workType: 'complete',
      hasMLFData: true
    },
    {
      id: 'project-2',
      projectName: 'Project Beta',
      projectSource: 'custom',
      description: 'Custom fabrication project for specialized marine structures',
      yardLocation: 'JAY',
      projectType: 'prospect',
      status: 'active',
      workType: 'yard-only',
      hasMLFData: false
    },
    {
      id: 'project-3',
      projectName: 'Project Gamma',
      projectSource: 'p6',
      description: 'Large scale subsea infrastructure development project',
      yardLocation: 'QFAB',
      projectType: 'booked',
      status: 'hold',
      workType: 'complete',
      hasMLFData: true
    },
    {
      id: 'project-4',
      projectName: 'Project Delta',
      projectSource: 'p6',
      description: 'Modular construction project with advanced automation',
      yardLocation: 'SAFIRA',
      projectType: 'booked',
      status: 'active',
      workType: 'complete',
      hasMLFData: true
    }
  ];

  getStatusVariant(status: string): BadgeVariant {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'hold': return 'warning';
      case 'canceled': return 'destructive';
      default: return 'secondary';
    }
  }

  onViewProject(projectId: string): void {
    this.navigateToDetails.emit(projectId);
  }
}