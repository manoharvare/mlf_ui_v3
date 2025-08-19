import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  ExternalLink,
  Filter
} from 'lucide-angular';
import { CardComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';

@Component({
  selector: 'app-power-bi-reports',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent
  ],
  template: `
    <div class="h-full overflow-auto bg-background">
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex items-center gap-3">
            <lucide-icon [name]="BarChart3" [size]="24" class="text-blue-500"></lucide-icon>
            <div>
              <h2 class="text-xl font-semibold">Power BI Reports</h2>
              <p class="text-sm text-muted-foreground">Interactive analytics and executive dashboards</p>
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
          </div>
        </div>

        <!-- Report Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <lucide-icon [name]="BarChart3" [size]="20" class="text-blue-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Executive Dashboard</h3>
                  <p class="text-sm text-muted-foreground">High-level KPIs</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Strategic overview with key performance indicators and trends
              </p>
              <div class="flex items-center justify-between">
                <ui-badge variant="success">Live</ui-badge>
                <ui-button variant="ghost" size="sm">
                  <lucide-icon [name]="ExternalLink" [size]="14"></lucide-icon>
                </ui-button>
              </div>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <lucide-icon [name]="TrendingUp" [size]="20" class="text-green-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Forecast Analysis</h3>
                  <p class="text-sm text-muted-foreground">Detailed forecasting</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Comprehensive forecast accuracy and variance analysis
              </p>
              <div class="flex items-center justify-between">
                <ui-badge variant="success">Live</ui-badge>
                <ui-button variant="ghost" size="sm">
                  <lucide-icon [name]="ExternalLink" [size]="14"></lucide-icon>
                </ui-button>
              </div>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <lucide-icon [name]="PieChart" [size]="20" class="text-purple-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Resource Utilization</h3>
                  <p class="text-sm text-muted-foreground">Craft & capacity</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Labor resource allocation and utilization metrics
              </p>
              <div class="flex items-center justify-between">
                <ui-badge variant="success">Live</ui-badge>
                <ui-button variant="ghost" size="sm">
                  <lucide-icon [name]="ExternalLink" [size]="14"></lucide-icon>
                </ui-button>
              </div>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-orange-100 rounded-lg">
                  <lucide-icon [name]="LineChart" [size]="20" class="text-orange-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Project Performance</h3>
                  <p class="text-sm text-muted-foreground">Project metrics</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Individual project performance and milestone tracking
              </p>
              <div class="flex items-center justify-between">
                <ui-badge variant="success">Live</ui-badge>
                <ui-button variant="ghost" size="sm">
                  <lucide-icon [name]="ExternalLink" [size]="14"></lucide-icon>
                </ui-button>
              </div>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-teal-100 rounded-lg">
                  <lucide-icon [name]="Calendar" [size]="20" class="text-teal-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Historical Trends</h3>
                  <p class="text-sm text-muted-foreground">Time series data</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Historical performance trends and seasonal patterns
              </p>
              <div class="flex items-center justify-between">
                <ui-badge variant="success">Live</ui-badge>
                <ui-button variant="ghost" size="sm">
                  <lucide-icon [name]="ExternalLink" [size]="14"></lucide-icon>
                </ui-button>
              </div>
            </div>
          </ui-card>

          <ui-card class="cursor-pointer hover:shadow-md transition-shadow">
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-red-100 rounded-lg">
                  <lucide-icon [name]="BarChart3" [size]="20" class="text-red-600"></lucide-icon>
                </div>
                <div>
                  <h3 class="font-medium">Variance Deep Dive</h3>
                  <p class="text-sm text-muted-foreground">Detailed analysis</p>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mb-3">
                Detailed variance analysis with root cause identification
              </p>
              <div class="flex items-center justify-between">
                <ui-badge variant="success">Live</ui-badge>
                <ui-button variant="ghost" size="sm">
                  <lucide-icon [name]="ExternalLink" [size]="14"></lucide-icon>
                </ui-button>
              </div>
            </div>
          </ui-card>
        </div>

        <!-- Featured Reports -->
        <ui-card>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Featured Reports</h3>
              <ui-button variant="outline" size="sm">
                <lucide-icon [name]="Download" [size]="16" class="mr-2"></lucide-icon>
                Export All
              </ui-button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Report Preview 1 -->
              <div class="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium">Monthly MLF Summary</h4>
                  <ui-badge variant="success">Updated</ui-badge>
                </div>
                <p class="text-sm text-muted-foreground mb-4">
                  Comprehensive monthly overview with key metrics and variance analysis
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">Last updated: 2 hours ago</span>
                  <div class="flex gap-2">
                    <ui-button variant="outline" size="sm">
                      <lucide-icon [name]="Download" [size]="14" class="mr-2"></lucide-icon>
                      Export
                    </ui-button>
                    <ui-button size="sm">
                      <lucide-icon [name]="ExternalLink" [size]="14" class="mr-2"></lucide-icon>
                      View
                    </ui-button>
                  </div>
                </div>
              </div>

              <!-- Report Preview 2 -->
              <div class="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium">Quarterly Forecast Accuracy</h4>
                  <ui-badge variant="warning">Scheduled</ui-badge>
                </div>
                <p class="text-sm text-muted-foreground mb-4">
                  Quarterly analysis of forecast accuracy across all projects and crafts
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">Next update: Tomorrow 9:00 AM</span>
                  <div class="flex gap-2">
                    <ui-button variant="outline" size="sm">
                      <lucide-icon [name]="Download" [size]="14" class="mr-2"></lucide-icon>
                      Export
                    </ui-button>
                    <ui-button size="sm">
                      <lucide-icon [name]="ExternalLink" [size]="14" class="mr-2"></lucide-icon>
                      View
                    </ui-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ui-card>
      </div>
    </div>
  `
})
export class PowerBIReportsComponent {
  // Icons
  BarChart3 = BarChart3;
  PieChart = PieChart;
  LineChart = LineChart;
  TrendingUp = TrendingUp;
  Calendar = Calendar;
  Download = Download;
  RefreshCw = RefreshCw;
  ExternalLink = ExternalLink;
  Filter = Filter;
}