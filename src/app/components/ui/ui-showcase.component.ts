import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule,
  Plus,
  Download,
  Save,
  RotateCcw,
  Mail,
  Lock,
  Search,
  User,
  Shield,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  BarChart3,
  Layout,
  MousePointer,
  Type,
  Tag,
  Play,
  ChevronDown
} from 'lucide-angular';
import { 
  ButtonComponent, 
  InputComponent, 
  CardComponent, 
  CardHeaderComponent, 
  CardTitleComponent, 
  CardDescriptionComponent, 
  CardContentComponent, 
  CardFooterComponent,
  BadgeComponent,
  SelectComponent,
  type SelectOption
} from './index';

@Component({
  selector: 'ui-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    LucideAngularModule,
    ButtonComponent, 
    InputComponent, 
    CardComponent, 
    CardHeaderComponent, 
    CardTitleComponent, 
    CardDescriptionComponent, 
    CardContentComponent, 
    CardFooterComponent,
    BadgeComponent,
    SelectComponent
  ],
  template: `
    <div class="p-8 space-y-8 bg-background min-h-screen">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">UI Components Showcase</h1>
        
        <!-- Buttons Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="MousePointer">Button Components</ui-card-title>
            <ui-card-description>Various button styles and states</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-4">
              <!-- Button Variants -->
              <div>
                <h4 class="text-sm font-medium mb-3">Variants</h4>
                <div class="flex flex-wrap gap-3">
                  <ui-button variant="primary" (clicked)="onButtonClick('Primary')">Primary</ui-button>
                  <ui-button variant="secondary" (clicked)="onButtonClick('Secondary')">Secondary</ui-button>
                  <ui-button variant="outline" (clicked)="onButtonClick('Outline')">Outline</ui-button>
                  <ui-button variant="ghost" (clicked)="onButtonClick('Ghost')">Ghost</ui-button>
                  <ui-button variant="destructive" (clicked)="onButtonClick('Destructive')">Destructive</ui-button>
                </div>
              </div>
              
              <!-- Button Sizes -->
              <div>
                <h4 class="text-sm font-medium mb-3">Sizes</h4>
                <div class="flex flex-wrap items-center gap-3">
                  <ui-button size="sm">Small</ui-button>
                  <ui-button size="md">Medium</ui-button>
                  <ui-button size="lg">Large</ui-button>
                </div>
              </div>
              
              <!-- Button with Icons -->
              <div>
                <h4 class="text-sm font-medium mb-3">With Icons</h4>
                <div class="flex flex-wrap gap-3">
                  <ui-button [leftIcon]="Plus">Add New</ui-button>
                  <ui-button [rightIcon]="Download">Download</ui-button>
                  <ui-button [leftIcon]="Save" [rightIcon]="ArrowRight">Save & More</ui-button>
                </div>
              </div>
              
              <!-- Button States -->
              <div>
                <h4 class="text-sm font-medium mb-3">States</h4>
                <div class="flex flex-wrap gap-3">
                  <ui-button [disabled]="true">Disabled</ui-button>
                  <ui-button [loading]="true">Loading</ui-button>
                  <ui-button [loading]="true" [showTextWhileLoading]="true">Loading with text</ui-button>
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>
        
        <!-- Inputs Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="Type">Input Components</ui-card-title>
            <ui-card-description>Form input fields with various configurations</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ui-input 
                label="Basic Input" 
                placeholder="Enter text here..."
                [(ngModel)]="inputValue1">
              </ui-input>
              
              <ui-input 
                label="Email Input" 
                type="email"
                placeholder="Enter your email"
                [leftIcon]="Mail"
                [(ngModel)]="inputValue2">
              </ui-input>
              
              <ui-input 
                label="Password Input" 
                type="password"
                placeholder="Enter password"
                [leftIcon]="Lock"
                helperText="Password must be at least 8 characters"
                [(ngModel)]="inputValue3">
              </ui-input>
              
              <ui-input 
                label="Search Input" 
                type="search"
                placeholder="Search..."
                [leftIcon]="Search"
                [clearable]="true"
                [(ngModel)]="inputValue4">
              </ui-input>
              
              <ui-input 
                label="Required Field" 
                placeholder="This field is required"
                [required]="true"
                errorMessage="This field is required"
                [(ngModel)]="inputValue5">
              </ui-input>
              
              <ui-input 
                label="Disabled Input" 
                placeholder="This is disabled"
                [disabled]="true"
                [(ngModel)]="inputValue6">
              </ui-input>
            </div>
          </ui-card-content>
        </ui-card>
        
        <!-- Select Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="ChevronDown">Select Components</ui-card-title>
            <ui-card-description>Dropdown selection components</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ui-select 
                label="Basic Select"
                placeholder="Choose an option"
                [options]="basicOptions"
                [(ngModel)]="selectValue1">
              </ui-select>
              
              <ui-select 
                label="Select with Icons"
                placeholder="Choose a status"
                [options]="statusOptions"
                [(ngModel)]="selectValue2">
              </ui-select>
              
              <ui-select 
                label="Searchable Select"
                placeholder="Search and select"
                [options]="searchableOptions"
                [searchable]="true"
                [(ngModel)]="selectValue3">
              </ui-select>
              
              <ui-select 
                label="Required Select"
                placeholder="This is required"
                [options]="basicOptions"
                [required]="true"
                errorMessage="Please select an option"
                [(ngModel)]="selectValue4">
              </ui-select>
            </div>
          </ui-card-content>
        </ui-card>
        
        <!-- Badges Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="Tag">Badge Components</ui-card-title>
            <ui-card-description>Status indicators and labels</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-4">
              <!-- Badge Variants -->
              <div>
                <h4 class="text-sm font-medium mb-3">Variants</h4>
                <div class="flex flex-wrap gap-3">
                  <ui-badge variant="default">Default</ui-badge>
                  <ui-badge variant="secondary">Secondary</ui-badge>
                  <ui-badge variant="outline">Outline</ui-badge>
                  <ui-badge variant="destructive">Destructive</ui-badge>
                  <ui-badge variant="success">Success</ui-badge>
                  <ui-badge variant="warning">Warning</ui-badge>
                  <ui-badge variant="info">Info</ui-badge>
                </div>
              </div>
              
              <!-- Badge Sizes -->
              <div>
                <h4 class="text-sm font-medium mb-3">Sizes</h4>
                <div class="flex flex-wrap items-center gap-3">
                  <ui-badge size="sm">Small</ui-badge>
                  <ui-badge size="md">Medium</ui-badge>
                  <ui-badge size="lg">Large</ui-badge>
                </div>
              </div>
              
              <!-- Badge with Icons -->
              <div>
                <h4 class="text-sm font-medium mb-3">With Icons</h4>
                <div class="flex flex-wrap gap-3">
                  <ui-badge [leftIcon]="CheckCircle" variant="success">Completed</ui-badge>
                  <ui-badge [leftIcon]="Clock" variant="warning">Pending</ui-badge>
                  <ui-badge [leftIcon]="XCircle" variant="destructive">Failed</ui-badge>
                  <ui-badge [rightIcon]="ArrowRight">Next</ui-badge>
                  <ui-badge [dot]="true" variant="info">New</ui-badge>
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>
        
        <!-- Cards Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="Layout">Card Components</ui-card-title>
            <ui-card-description>Content containers with various layouts</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Basic Card -->
              <ui-card>
                <ui-card-header>
                  <ui-card-title>Basic Card</ui-card-title>
                  <ui-card-description>This is a basic card with header and content</ui-card-description>
                </ui-card-header>
                <ui-card-content>
                  <p class="text-sm text-muted-foreground">Card content goes here. This is a simple card layout.</p>
                </ui-card-content>
              </ui-card>
              
              <!-- Card with Icon -->
              <ui-card>
                <ui-card-header>
                  <ui-card-title [icon]="BarChart3" size="lg">Analytics</ui-card-title>
                  <ui-card-description>View your analytics data</ui-card-description>
                </ui-card-header>
                <ui-card-content>
                  <div class="text-2xl font-bold">1,234</div>
                  <p class="text-xs text-muted-foreground">+20.1% from last month</p>
                </ui-card-content>
              </ui-card>
              
              <!-- Card with Footer -->
              <ui-card>
                <ui-card-header>
                  <ui-card-title>Project Status</ui-card-title>
                  <ui-card-description>Current project information</ui-card-description>
                </ui-card-header>
                <ui-card-content>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm">Progress</span>
                      <span class="text-sm font-medium">75%</span>
                    </div>
                    <div class="w-full bg-secondary rounded-full h-2">
                      <div class="bg-primary h-2 rounded-full" style="width: 75%"></div>
                    </div>
                  </div>
                </ui-card-content>
                <ui-card-footer>
                  <ui-button size="sm" variant="outline" class="w-full">View Details</ui-button>
                </ui-card-footer>
              </ui-card>
            </div>
          </ui-card-content>
        </ui-card>
        
        <!-- Interactive Demo -->
        <ui-card>
          <ui-card-header>
            <ui-card-title [icon]="Play">Interactive Demo</ui-card-title>
            <ui-card-description>Test the components interactively</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ui-input 
                  label="Your Name" 
                  placeholder="Enter your name"
                  [leftIcon]="User"
                  [(ngModel)]="demoName">
                </ui-input>
                
                <ui-select 
                  label="Your Role"
                  placeholder="Select your role"
                  [options]="roleOptions"
                  [(ngModel)]="demoRole">
                </ui-select>
              </div>
              
              <div class="flex gap-3">
                <ui-button 
                  [leftIcon]="Save" 
                  (clicked)="saveDemoData()"
                  [disabled]="!demoName || !demoRole">
                  Save
                </ui-button>
                <ui-button 
                  variant="outline" 
                  [leftIcon]="RotateCcw"
                  (clicked)="resetDemoData()">
                  Reset
                </ui-button>
              </div>
              
              <div *ngIf="demoMessage" class="p-4 bg-muted rounded-md">
                <p class="text-sm">{{ demoMessage }}</p>
              </div>
            </div>
          </ui-card-content>
        </ui-card>
      </div>
    </div>
  `
})
export class UiShowcaseComponent {
  // Icon references for template
  Plus = Plus;
  Download = Download;
  Save = Save;
  RotateCcw = RotateCcw;
  Mail = Mail;
  Lock = Lock;
  Search = Search;
  User = User;
  Shield = Shield;
  Eye = Eye;
  CheckCircle = CheckCircle;
  Clock = Clock;
  XCircle = XCircle;
  ArrowRight = ArrowRight;
  BarChart3 = BarChart3;
  Layout = Layout;
  MousePointer = MousePointer;
  Type = Type;
  Tag = Tag;
  Play = Play;
  ChevronDown = ChevronDown;

  // Input values
  inputValue1 = '';
  inputValue2 = '';
  inputValue3 = '';
  inputValue4 = '';
  inputValue5 = '';
  inputValue6 = 'Disabled value';
  
  // Select values
  selectValue1 = '';
  selectValue2 = '';
  selectValue3 = '';
  selectValue4 = '';
  
  // Demo values
  demoName = '';
  demoRole = '';
  demoMessage = '';
  
  // Select options
  basicOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true }
  ];
  
  statusOptions: SelectOption[] = [
    { value: 'active', label: 'Active', icon: this.CheckCircle },
    { value: 'pending', label: 'Pending', icon: this.Clock },
    { value: 'inactive', label: 'Inactive', icon: this.XCircle }
  ];
  
  searchableOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' }
  ];
  
  roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Administrator', icon: this.Shield },
    { value: 'user', label: 'User', icon: this.User },
    { value: 'viewer', label: 'Viewer', icon: this.Eye }
  ];
  
  onButtonClick(variant: string): void {
    console.log(`${variant} button clicked!`);
  }
  
  saveDemoData(): void {
    this.demoMessage = `Hello ${this.demoName}! Your role is set to ${this.roleOptions.find(r => r.value === this.demoRole)?.label}.`;
  }
  
  resetDemoData(): void {
    this.demoName = '';
    this.demoRole = '';
    this.demoMessage = '';
  }
}