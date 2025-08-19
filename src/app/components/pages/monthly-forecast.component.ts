import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Calendar,
  Filter,
  Calculator,
  TrendingUp,
  AlertTriangle,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-angular';
import { CardComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { InputComponent } from '../ui/input.component';
import { SelectComponent } from '../ui/select.component';
import { BadgeComponent } from '../ui/badge.component';

@Component({
  selector: 'app-monthly-forecast',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CardComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    BadgeComponent
  ],
  template: `
    <div class="h-full overflow-auto bg-background">
      <div class="p-6 space-y-6">
        <!-- Header Controls -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex items-center gap-4">
            <ui-select placeholder="Select Project">
              <option value="project-1">Project Alpha</option>
              <option value="project-2">Project Beta</option>
              <option value="project-3">Project Gamma</option>
            </ui-select>
            
            <ui-select placeholder="Select Month">
              <option value="2024-01">January 2024</option>
              <option value="2024-02">February 2024</option>
              <option value="2024-03">March 2024</option>
            </ui-select>
          </div>
          
          <div class="flex items-center gap-2">
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="Filter" [size]="16" class="mr-2"></lucide-icon>
              Filter
            </ui-button>
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="Calculator" [size]="16" class="mr-2"></lucide-icon>
              Calculate
            </ui-button>
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="RefreshCw" [size]="16" class="mr-2"></lucide-icon>
              Refresh
            </ui-button>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Total Hours</p>
                  <p class="text-2xl font-bold">12,450</p>
                </div>
                <lucide-icon [name]="TrendingUp" [size]="24" class="text-blue-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Activities</p>
                  <p class="text-2xl font-bold">156</p>
                </div>
                <lucide-icon [name]="Calendar" [size]="24" class="text-green-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Variance</p>
                  <p class="text-2xl font-bold text-orange-600">+5.2%</p>
                </div>
                <lucide-icon [name]="AlertTriangle" [size]="24" class="text-orange-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Status</p>
                  <ui-badge variant="success">Active</ui-badge>
                </div>
                <lucide-icon [name]="Calculator" [size]="24" class="text-purple-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
        </div>

        <!-- Main Content Area -->
        <ui-card>
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold">Monthly Labor Forecast</h3>
              <div class="flex items-center gap-2">
                <ui-button variant="outline" size="sm">
                  <lucide-icon [name]="Upload" [size]="16" class="mr-2"></lucide-icon>
                  Import
                </ui-button>
                <ui-button variant="outline" size="sm">
                  <lucide-icon [name]="Download" [size]="16" class="mr-2"></lucide-icon>
                  Export
                </ui-button>
                <ui-button size="sm">
                  <lucide-icon [name]="Save" [size]="16" class="mr-2"></lucide-icon>
                  Save Forecast
                </ui-button>
              </div>
            </div>
            
            <!-- Placeholder for forecast table/tree -->
            <div class="border rounded-lg p-8 text-center">
              <lucide-icon [name]="Calendar" [size]="48" class="mx-auto text-muted-foreground mb-4"></lucide-icon>
              <h4 class="text-lg font-medium mb-2">Monthly Forecast View</h4>
              <p class="text-muted-foreground mb-4">
                This is where the hierarchical forecast tree would be displayed with:
              </p>
              <ul class="text-sm text-muted-foreground space-y-1 max-w-md mx-auto">
                <li>• Activity Spread (L3) level breakdown</li>
                <li>• L4 Activity details with SPC codes</li>
                <li>• Weekly hour distributions</li>
                <li>• Craft assignments and calculations</li>
                <li>• Interactive editing capabilities</li>
              </ul>
            </div>
          </div>
        </ui-card>
      </div>
    </div>
  `
})
export class MonthlyForecastComponent {
  // Icons
  Calendar = Calendar;
  Filter = Filter;
  Calculator = Calculator;
  TrendingUp = TrendingUp;
  AlertTriangle = AlertTriangle;
  Save = Save;
  RefreshCw = RefreshCw;
  Download = Download;
  Upload = Upload;
}