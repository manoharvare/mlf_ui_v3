import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-angular';
import { CardComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';
import { SelectComponent } from '../ui/select.component';

@Component({
  selector: 'app-mlf-variance-report',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    SelectComponent
  ],
  template: `
    <div class="h-full overflow-auto bg-background">
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex items-center gap-3">
            <lucide-icon [name]="BarChart3" [size]="24" class="text-blue-500"></lucide-icon>
            <div>
              <h2 class="text-xl font-semibold">MLF Variance Report</h2>
              <p class="text-sm text-muted-foreground">Analyze forecast vs actual labor hours</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="Filter" [size]="16" class="mr-2"></lucide-icon>
              Filter
            </ui-button>
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="RefreshCw" [size]="16" class="mr-2"></lucide-icon>
              Refresh
            </ui-button>
            <ui-button variant="outline" size="sm">
              <lucide-icon [name]="Download" [size]="16" class="mr-2"></lucide-icon>
              Export
            </ui-button>
          </div>
        </div>

        <!-- Filters -->
        <ui-card>
          <div class="p-4">
            <div class="flex flex-wrap gap-4 items-center">
              <ui-select placeholder="Select Project">
                <option value="all">All Projects</option>
                <option value="project-1">Project Alpha</option>
                <option value="project-2">Project Beta</option>
                <option value="project-3">Project Gamma</option>
              </ui-select>
              
              <ui-select placeholder="Time Period">
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </ui-select>
              
              <ui-select placeholder="Variance Type">
                <option value="all">All Variances</option>
                <option value="positive">Positive Only</option>
                <option value="negative">Negative Only</option>
                <option value="significant">Significant (>10%)</option>
              </ui-select>
            </div>
          </div>
        </ui-card>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Total Variance</p>
                  <p class="text-2xl font-bold text-orange-600">+5.2%</p>
                </div>
                <lucide-icon [name]="TrendingUp" [size]="24" class="text-orange-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Forecasted Hours</p>
                  <p class="text-2xl font-bold">45,230</p>
                </div>
                <lucide-icon [name]="Calendar" [size]="24" class="text-blue-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Actual Hours</p>
                  <p class="text-2xl font-bold">47,580</p>
                </div>
                <lucide-icon [name]="BarChart3" [size]="24" class="text-green-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
          
          <ui-card>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Variance Hours</p>
                  <p class="text-2xl font-bold text-red-600">+2,350</p>
                </div>
                <lucide-icon [name]="TrendingUp" [size]="24" class="text-red-500"></lucide-icon>
              </div>
            </div>
          </ui-card>
        </div>

        <!-- Variance Analysis -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Project Variance -->
          <ui-card>
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-4">Project Variance Analysis</h3>
              
              <div class="space-y-4">
                <div *ngFor="let project of projectVariances" class="border rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium">{{ project.name }}</h4>
                    <ui-badge [variant]="project.variance > 0 ? 'destructive' : 'success'">
                      {{ project.variance > 0 ? '+' : '' }}{{ project.variance }}%
                    </ui-badge>
                  </div>
                  
                  <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p class="text-muted-foreground">Forecasted</p>
                      <p class="font-medium">{{ project.forecasted | number }}</p>
                    </div>
                    <div>
                      <p class="text-muted-foreground">Actual</p>
                      <p class="font-medium">{{ project.actual | number }}</p>
                    </div>
                    <div>
                      <p class="text-muted-foreground">Difference</p>
                      <p [class]="project.variance > 0 ? 'font-medium text-red-600' : 'font-medium text-green-600'">
                        {{ project.variance > 0 ? '+' : '' }}{{ project.actual - project.forecasted | number }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ui-card>

          <!-- Craft Variance -->
          <ui-card>
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-4">Craft Variance Analysis</h3>
              
              <div class="space-y-4">
                <div *ngFor="let craft of craftVariances" class="border rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium">{{ craft.name }}</h4>
                    <div class="flex items-center gap-2">
                      <lucide-icon 
                        [name]="craft.variance > 0 ? TrendingUp : TrendingDown" 
                        [size]="16" 
                        [class]="craft.variance > 0 ? 'text-red-500' : 'text-green-500'"
                      ></lucide-icon>
                      <ui-badge [variant]="craft.variance > 0 ? 'destructive' : 'success'">
                        {{ craft.variance > 0 ? '+' : '' }}{{ craft.variance }}%
                      </ui-badge>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p class="text-muted-foreground">Forecasted</p>
                      <p class="font-medium">{{ craft.forecasted | number }}</p>
                    </div>
                    <div>
                      <p class="text-muted-foreground">Actual</p>
                      <p class="font-medium">{{ craft.actual | number }}</p>
                    </div>
                    <div>
                      <p class="text-muted-foreground">Difference</p>
                      <p [class]="craft.variance > 0 ? 'font-medium text-red-600' : 'font-medium text-green-600'">
                        {{ craft.variance > 0 ? '+' : '' }}{{ craft.actual - craft.forecasted | number }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ui-card>
        </div>
      </div>
    </div>
  `
})
export class MLFVarianceReportComponent {
  // Icons
  BarChart3 = BarChart3;
  TrendingUp = TrendingUp;
  TrendingDown = TrendingDown;
  Calendar = Calendar;
  Filter = Filter;
  Download = Download;
  RefreshCw = RefreshCw;

  projectVariances = [
    { name: 'Project Alpha', forecasted: 15420, actual: 16230, variance: 5.3 },
    { name: 'Project Beta', forecasted: 12850, actual: 12100, variance: -5.8 },
    { name: 'Project Gamma', forecasted: 18960, actual: 20250, variance: 6.8 },
    { name: 'Project Delta', forecasted: 8900, actual: 8750, variance: -1.7 }
  ];

  craftVariances = [
    { name: 'Welders', forecasted: 8500, actual: 9200, variance: 8.2 },
    { name: 'Fitters', forecasted: 6200, actual: 5800, variance: -6.5 },
    { name: 'Riggers', forecasted: 4100, actual: 4350, variance: 6.1 },
    { name: 'Electricians', forecasted: 3200, actual: 3100, variance: -3.1 }
  ];
}