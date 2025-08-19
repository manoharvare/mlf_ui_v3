import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Settings2,
  MapPin,
  Building2,
  Flag,
  Briefcase,
  Database,
  Plus,
  Search,
  Upload,
  Download,
  Edit,
  Trash2
} from 'lucide-angular';
import { CardComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { BadgeComponent } from '../ui/badge.component';
import { TabsComponent } from '../ui/tabs.component';

@Component({
  selector: 'app-master-data-configurations',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CardComponent,
    ButtonComponent,
    InputComponent,
    BadgeComponent,
    TabsComponent
  ],
  template: `
    <div class="h-full overflow-auto bg-background">
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex items-center gap-3">
            <lucide-icon [name]="Database" [size]="24" class="text-blue-500"></lucide-icon>
            <div>
              <h2 class="text-xl font-semibold">Master Data Configurations</h2>
              <p class="text-sm text-muted-foreground">Manage foundational data and reference tables</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="Upload" [size]="16" class="mr-2"></lucide-icon>
              Import
            </ui-button>
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="Download" [size]="16" class="mr-2"></lucide-icon>
              Export
            </ui-button>
          </div>
        </div>

        <!-- Master Data Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <lucide-icon [name]="MapPin" [size]="20" class="text-blue-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Yard Locations</h3>
                  <p class="text-sm text-muted-foreground">5 locations</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Fabrication yard locations and facility information
              </p>
              <ui-badge variant="outline">System</ui-badge>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <lucide-icon [name]="Building2" [size]="20" class="text-green-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Project Types</h3>
                  <p class="text-sm text-muted-foreground">2 types</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Project classification and type definitions
              </p>
              <ui-badge variant="outline">System</ui-badge>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <lucide-icon [name]="Flag" [size]="20" class="text-purple-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Status Codes</h3>
                  <p class="text-sm text-muted-foreground">4 statuses</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Project and activity status definitions
              </p>
              <ui-badge variant="outline">System</ui-badge>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-orange-100 rounded-lg">
                  <lucide-icon [name]="Briefcase" [size]="20" class="text-orange-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Work Types</h3>
                  <p class="text-sm text-muted-foreground">2 types</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Work scope and calculation type definitions
              </p>
              <ui-badge variant="outline">System</ui-badge>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-teal-100 rounded-lg">
                  <lucide-icon [name]="Settings2" [size]="20" class="text-teal-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Global Activity Codes</h3>
                  <p class="text-sm text-muted-foreground">150+ codes</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Standard activity codes and descriptions
              </p>
              <ui-badge variant="secondary">Configurable</ui-badge>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-red-100 rounded-lg">
                  <lucide-icon [name]="Database" [size]="20" class="text-red-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Standard Craft</h3>
                  <p class="text-sm text-muted-foreground">25+ crafts</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Craft definitions and skill categories
              </p>
              <ui-badge variant="secondary">Configurable</ui-badge>
            </div>
          </ui-card>
        </div>

        <!-- Sample Data Table -->
        <ui-card>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Yard Locations</h3>
              <div class="flex items-center gap-2">
                <div class="relative">
                  <lucide-icon [name]="Search" [size]="16" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></lucide-icon>
                  <ui-input placeholder="Search locations..." class="pl-9 w-64"></ui-input>
                </div>
                <ui-button size="sm">
                  <lucide-icon [name]="Plus" [size]="16" class="mr-2"></lucide-icon>
                  Add Location
                </ui-button>
              </div>
            </div>
            
            <div class="border rounded-lg overflow-hidden">
              <table class="w-full">
                <thead class="bg-muted/50">
                  <tr>
                    <th class="text-left p-3 font-medium">Code</th>
                    <th class="text-left p-3 font-medium">Name</th>
                    <th class="text-left p-3 font-medium">Region</th>
                    <th class="text-left p-3 font-medium">Capacity</th>
                    <th class="text-left p-3 font-medium">Status</th>
                    <th class="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let location of sampleLocations" class="border-t hover:bg-muted/30">
                    <td class="p-3 font-mono">{{ location.code }}</td>
                    <td class="p-3">{{ location.name }}</td>
                    <td class="p-3">{{ location.region }}</td>
                    <td class="p-3">{{ location.capacity }}</td>
                    <td class="p-3">
                      <ui-badge [variant]="location.status === 'Active' ? 'success' : 'secondary'">
                        {{ location.status }}
                      </ui-badge>
                    </td>
                    <td class="p-3">
                      <div class="flex items-center gap-1">
                        <ui-button variant="ghost" size="sm">
                          <lucide-icon [name]="Edit" [size]="14"></lucide-icon>
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
export class MasterDataConfigurationsComponent {
  // Icons
  Settings2 = Settings2;
  MapPin = MapPin;
  Building2 = Building2;
  Flag = Flag;
  Briefcase = Briefcase;
  Database = Database;
  Plus = Plus;
  Search = Search;
  Upload = Upload;
  Download = Download;
  Edit = Edit;
  Trash2 = Trash2;

  sampleLocations = [
    { code: 'BFA', name: 'Brownsville Fabrication', region: 'South Texas', capacity: 250, status: 'Active' },
    { code: 'JAY', name: 'Jacksonville Yard', region: 'Florida', capacity: 180, status: 'Active' },
    { code: 'SAFIRA', name: 'Safira Facility', region: 'Brazil', capacity: 320, status: 'Active' },
    { code: 'QFAB', name: 'Qatar Fabrication', region: 'Middle East', capacity: 400, status: 'Active' },
    { code: 'QMW', name: 'Qatar Marine Works', region: 'Middle East', capacity: 300, status: 'Active' }
  ];
}