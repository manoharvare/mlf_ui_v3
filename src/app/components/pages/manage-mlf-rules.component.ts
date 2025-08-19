import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule,
  Settings,
  Plus,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  AlertTriangle
} from 'lucide-angular';
import { CardComponent } from '../ui/card.component';
import { ButtonComponent } from '../ui/button.component';
import { BadgeComponent } from '../ui/badge.component';

@Component({
  selector: 'app-manage-mlf-rules',
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
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <lucide-icon [name]="Settings" [size]="24" class="text-purple-500"></lucide-icon>
            <div>
              <h2 class="text-xl font-semibold">Manage MLF Rules</h2>
              <p class="text-sm text-muted-foreground">Configure business rules for MLF calculations</p>
            </div>
          </div>
          
          <ui-button>
            <lucide-icon [name]="Plus" [size]="16" class="mr-2"></lucide-icon>
            Create Rule
          </ui-button>
        </div>

        <!-- Rule Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ui-card>
            <div class="p-4">
              <h3 class="font-medium mb-2">P6 to L4 Breakdown</h3>
              <p class="text-sm text-muted-foreground mb-3">Rules for converting P6 activities to L4 level</p>
              <div class="flex items-center justify-between">
                <ui-badge variant="secondary">5 Rules</ui-badge>
                <ui-badge variant="success">Active</ui-badge>
              </div>
            </div>
          </ui-card>

          <ui-card>
            <div class="p-4">
              <h3 class="font-medium mb-2">Task Mapping Logic</h3>
              <p class="text-sm text-muted-foreground mb-3">SPC code assignment and task mapping rules</p>
              <div class="flex items-center justify-between">
                <ui-badge variant="secondary">8 Rules</ui-badge>
                <ui-badge variant="success">Active</ui-badge>
              </div>
            </div>
          </ui-card>

          <ui-card>
            <div class="p-4">
              <h3 class="font-medium mb-2">Variance Calculations</h3>
              <p class="text-sm text-muted-foreground mb-3">Rules for calculating forecast variances</p>
              <div class="flex items-center justify-between">
                <ui-badge variant="secondary">3 Rules</ui-badge>
                <ui-badge variant="warning">Review</ui-badge>
              </div>
            </div>
          </ui-card>
        </div>

        <!-- Rules List -->
        <ui-card>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4">Business Rules</h3>
            
            <div class="space-y-4">
              <div *ngFor="let rule of businessRules" class="border rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="font-medium">{{ rule.name }}</h4>
                      <ui-badge [variant]="rule.status === 'active' ? 'success' : rule.status === 'inactive' ? 'secondary' : 'warning'">
                        {{ rule.status | titlecase }}
                      </ui-badge>
                      <ui-badge variant="outline">{{ rule.category }}</ui-badge>
                    </div>
                    <p class="text-sm text-muted-foreground mb-2">{{ rule.description }}</p>
                    <div class="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Created: {{ rule.createdDate }}</span>
                      <span>Modified: {{ rule.modifiedDate }}</span>
                      <span>Priority: {{ rule.priority }}</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2 ml-4">
                    <ui-button variant="ghost" size="sm">
                      <lucide-icon [name]="Copy" [size]="14"></lucide-icon>
                    </ui-button>
                    <ui-button variant="ghost" size="sm">
                      <lucide-icon [name]="Edit" [size]="14"></lucide-icon>
                    </ui-button>
                    <ui-button variant="ghost" size="sm">
                      <lucide-icon [name]="rule.status === 'active' ? Pause : Play" [size]="14"></lucide-icon>
                    </ui-button>
                    <ui-button variant="ghost" size="sm">
                      <lucide-icon [name]="Trash2" [size]="14"></lucide-icon>
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
export class ManageMLFRulesComponent {
  // Icons
  Settings = Settings;
  Plus = Plus;
  Edit = Edit;
  Trash2 = Trash2;
  Copy = Copy;
  Play = Play;
  Pause = Pause;
  AlertTriangle = AlertTriangle;

  businessRules = [
    {
      id: 1,
      name: 'Standard P6 Activity Breakdown',
      description: 'Converts P6 activities to L4 level using standard craft ratios and duration splits',
      category: 'P6 Breakdown',
      status: 'active',
      priority: 'High',
      createdDate: '2024-01-15',
      modifiedDate: '2024-01-20'
    },
    {
      id: 2,
      name: 'SPC Code Auto-Assignment',
      description: 'Automatically assigns SPC codes based on activity type and craft requirements',
      category: 'Task Mapping',
      status: 'active',
      priority: 'High',
      createdDate: '2024-01-10',
      modifiedDate: '2024-01-18'
    },
    {
      id: 3,
      name: 'Variance Threshold Alert',
      description: 'Triggers alerts when forecast variance exceeds 10% threshold',
      category: 'Variance',
      status: 'review',
      priority: 'Medium',
      createdDate: '2024-01-05',
      modifiedDate: '2024-01-25'
    },
    {
      id: 4,
      name: 'Weekend Hour Adjustment',
      description: 'Adjusts labor hours for weekend work with overtime multipliers',
      category: 'Calculation',
      status: 'inactive',
      priority: 'Low',
      createdDate: '2023-12-20',
      modifiedDate: '2024-01-12'
    }
  ];
}