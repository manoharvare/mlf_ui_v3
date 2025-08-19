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
  ChevronDown,
  AlertTriangle,
  LucideIconData,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Palette,
  Zap,
  Info
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
  CheckboxComponent,
  RadioGroupComponent,
  SwitchComponent,
  ModalComponent,
  ToastContainerComponent,
  ProgressComponent,
  CircularProgressComponent,
  TabsComponent,
  TabPanelComponent,
  AccordionComponent,
  TooltipComponent,
  SpinnerComponent,
  DropdownComponent,
  type SelectOption,
  type RadioOption,
  type ToastData,
  type TabItem,
  type AccordionItem,
  type DropdownItem
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
    SelectComponent,
    CheckboxComponent,
    RadioGroupComponent,
    SwitchComponent,
    ModalComponent,
    ToastContainerComponent,
    ProgressComponent,
    CircularProgressComponent,
    TabsComponent,
    TabPanelComponent,
    AccordionComponent,
    TooltipComponent,
    SpinnerComponent,
    DropdownComponent
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
        
        <!-- Form Controls Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="CheckCircle">Form Controls</ui-card-title>
            <ui-card-description>Checkboxes, radio buttons, and switches</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-6">
              <!-- Checkboxes -->
              <div>
                <h4 class="text-sm font-medium mb-3">Checkboxes</h4>
                <div class="space-y-3">
                  <ui-checkbox 
                    label="Accept terms and conditions" 
                    [(ngModel)]="checkboxValue1">
                  </ui-checkbox>
                  <ui-checkbox 
                    label="Subscribe to newsletter" 
                    helperText="Get updates about new features"
                    [(ngModel)]="checkboxValue2">
                  </ui-checkbox>
                  <ui-checkbox 
                    label="Disabled checkbox" 
                    [disabled]="true"
                    [(ngModel)]="checkboxValue3">
                  </ui-checkbox>
                </div>
              </div>
              
              <!-- Radio Buttons -->
              <div>
                <h4 class="text-sm font-medium mb-3">Radio Buttons</h4>
                <ui-radio-group
                  label="Choose your plan"
                  [options]="planOptions"
                  [(ngModel)]="radioValue1">
                </ui-radio-group>
              </div>
              
              <!-- Switches -->
              <div>
                <h4 class="text-sm font-medium mb-3">Switches</h4>
                <div class="space-y-4">
                  <ui-switch 
                    label="Enable notifications" 
                    description="Receive push notifications"
                    [(ngModel)]="switchValue1">
                  </ui-switch>
                  <ui-switch 
                    label="Dark mode" 
                    [(ngModel)]="switchValue2">
                  </ui-switch>
                  <ui-switch 
                    label="Disabled switch" 
                    [disabled]="true"
                    [(ngModel)]="switchValue3">
                  </ui-switch>
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Progress Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="BarChart3">Progress Indicators</ui-card-title>
            <ui-card-description>Progress bars and circular progress</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-6">
              <!-- Linear Progress -->
              <div>
                <h4 class="text-sm font-medium mb-3">Linear Progress</h4>
                <div class="space-y-4">
                  <ui-progress 
                    [value]="progressValue" 
                    label="Upload Progress"
                    [showLabel]="true"
                    [showPercentage]="true">
                  </ui-progress>
                  <ui-progress 
                    [value]="75" 
                    variant="success"
                    size="sm">
                  </ui-progress>
                  <ui-progress 
                    [value]="45" 
                    variant="warning"
                    [showStripes]="true">
                  </ui-progress>
                </div>
              </div>
              
              <!-- Circular Progress -->
              <div>
                <h4 class="text-sm font-medium mb-3">Circular Progress</h4>
                <div class="flex gap-6">
                  <ui-circular-progress 
                    [value]="progressValue"
                    [size]="100">
                  </ui-circular-progress>
                  <ui-circular-progress 
                    [value]="85"
                    variant="success"
                    label="Success"
                    [size]="80">
                  </ui-circular-progress>
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Tabs Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="Layout">Tabs</ui-card-title>
            <ui-card-description>Tabbed content organization</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <ui-tabs [tabs]="tabItems" [(activeTab)]="activeTabId">
              <ui-tab-panel id="overview">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">Overview</h3>
                  <p class="text-muted-foreground">This is the overview tab content. Here you can display general information about your application or feature.</p>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-4 bg-muted rounded-lg">
                      <div class="text-2xl font-bold">1,234</div>
                      <div class="text-sm text-muted-foreground">Total Users</div>
                    </div>
                    <div class="p-4 bg-muted rounded-lg">
                      <div class="text-2xl font-bold">567</div>
                      <div class="text-sm text-muted-foreground">Active Sessions</div>
                    </div>
                    <div class="p-4 bg-muted rounded-lg">
                      <div class="text-2xl font-bold">89%</div>
                      <div class="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </ui-tab-panel>
              
              <ui-tab-panel id="analytics">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">Analytics</h3>
                  <p class="text-muted-foreground">Analytics and reporting data would be displayed here.</p>
                  <ui-progress [value]="75" label="Data Processing" [showLabel]="true" [showPercentage]="true"></ui-progress>
                </div>
              </ui-tab-panel>
              
              <ui-tab-panel id="settings">
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold">Settings</h3>
                  <p class="text-muted-foreground">Configuration options and preferences.</p>
                  <div class="space-y-3">
                    <ui-switch label="Enable notifications" [(ngModel)]="settingsNotifications"></ui-switch>
                    <ui-switch label="Auto-save" [(ngModel)]="settingsAutoSave"></ui-switch>
                  </div>
                </div>
              </ui-tab-panel>
            </ui-tabs>
          </ui-card-content>
        </ui-card>

        <!-- Modal Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="Layout">Modal Dialogs</ui-card-title>
            <ui-card-description>Modal dialogs and overlays</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="flex gap-3">
              <ui-button (clicked)="openModal('basic')">Basic Modal</ui-button>
              <ui-button variant="outline" (clicked)="openModal('form')">Form Modal</ui-button>
              <ui-button variant="destructive" (clicked)="openModal('confirm')">Confirm Modal</ui-button>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Toast Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="CheckCircle">Toast Notifications</ui-card-title>
            <ui-card-description>Toast messages and notifications</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="flex flex-wrap gap-3">
              <ui-button (clicked)="showToast('success')">Success Toast</ui-button>
              <ui-button variant="outline" (clicked)="showToast('info')">Info Toast</ui-button>
              <ui-button variant="destructive" (clicked)="showToast('error')">Error Toast</ui-button>
              <ui-button variant="secondary" (clicked)="showToast('warning')">Warning Toast</ui-button>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Accordion Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="ChevronDown">Accordion</ui-card-title>
            <ui-card-description>Collapsible content sections</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <ui-accordion [items]="accordionItems" type="single" [collapsible]="true">
            </ui-accordion>
          </ui-card-content>
        </ui-card>

        <!-- Tooltip Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="Info">Tooltips</ui-card-title>
            <ui-card-description>Helpful hints and information</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="flex flex-wrap gap-4">
              <ui-tooltip content="This is a tooltip on top" position="top">
                <ui-button variant="outline">Hover me (Top)</ui-button>
              </ui-tooltip>
              <ui-tooltip content="This is a tooltip on the right" position="right">
                <ui-button variant="outline">Hover me (Right)</ui-button>
              </ui-tooltip>
              <ui-tooltip content="This is a tooltip on the bottom" position="bottom">
                <ui-button variant="outline">Hover me (Bottom)</ui-button>
              </ui-tooltip>
              <ui-tooltip content="This is a tooltip on the left" position="left">
                <ui-button variant="outline">Hover me (Left)</ui-button>
              </ui-tooltip>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Spinner Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="RotateCcw">Loading Spinners</ui-card-title>
            <ui-card-description>Loading indicators and spinners</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium mb-3">Spinner Sizes</h4>
                <div class="flex items-center gap-4">
                  <ui-spinner size="xs" label="XS"></ui-spinner>
                  <ui-spinner size="sm" label="SM"></ui-spinner>
                  <ui-spinner size="md" label="MD"></ui-spinner>
                  <ui-spinner size="lg" label="LG"></ui-spinner>
                  <ui-spinner size="xl" label="XL"></ui-spinner>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium mb-3">Spinner Variants</h4>
                <div class="flex items-center gap-4">
                  <ui-spinner variant="default" label="Default"></ui-spinner>
                  <ui-spinner variant="primary" label="Primary"></ui-spinner>
                  <ui-spinner variant="secondary" label="Secondary"></ui-spinner>
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Dropdown Section -->
        <ui-card class="mb-8">
          <ui-card-header>
            <ui-card-title [icon]="MoreHorizontal">Dropdown Menus</ui-card-title>
            <ui-card-description>Context menus and dropdown actions</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <div class="flex gap-4">
              <ui-dropdown 
                [items]="dropdownItems" 
                triggerText="Actions"
                [showChevron]="true"
                (itemSelected)="onDropdownItemSelected($event)">
              </ui-dropdown>
              <ui-dropdown 
                [items]="dropdownItems" 
                [triggerIcon]="MoreHorizontal"
                [showChevron]="false"
                position="bottom-end"
                (itemSelected)="onDropdownItemSelected($event)">
              </ui-dropdown>
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
      
      <!-- Toast Container -->
      <ui-toast-container 
        [toasts]="toasts" 
        position="top-right"
        (toastRemoved)="removeToast($event)">
      </ui-toast-container>
      
      <!-- Modals -->
      <ui-modal 
        [(isOpen)]="modals.basic" 
        title="Basic Modal"
        description="This is a basic modal example">
        <p>This is the modal content. You can put any content here.</p>
        <div slot="footer">
          <ui-button variant="outline" (clicked)="closeModal('basic')">Cancel</ui-button>
          <ui-button (clicked)="closeModal('basic')">OK</ui-button>
        </div>
      </ui-modal>
      
      <ui-modal 
        [(isOpen)]="modals.form" 
        title="Form Modal"
        size="lg">
        <div class="space-y-4">
          <ui-input label="Name" placeholder="Enter your name" [(ngModel)]="formData.name"></ui-input>
          <ui-input label="Email" type="email" placeholder="Enter your email" [(ngModel)]="formData.email"></ui-input>
          <ui-radio-group 
            label="Preferred contact method"
            [options]="contactOptions"
            [(ngModel)]="formData.contact">
          </ui-radio-group>
        </div>
        <div slot="footer">
          <ui-button variant="outline" (clicked)="closeModal('form')">Cancel</ui-button>
          <ui-button (clicked)="submitForm()">Submit</ui-button>
        </div>
      </ui-modal>
      
      <ui-modal 
        [(isOpen)]="modals.confirm" 
        title="Confirm Action"
        [icon]="AlertTriangle"
        size="sm">
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <div slot="footer">
          <ui-button variant="outline" (clicked)="closeModal('confirm')">Cancel</ui-button>
          <ui-button variant="destructive" (clicked)="confirmAction()">Delete</ui-button>
        </div>
      </ui-modal>
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
  AlertTriangle = AlertTriangle;
  MoreHorizontal = MoreHorizontal;
  Edit = Edit;
  Trash2 = Trash2;
  Copy = Copy;
  Palette = Palette;
  Zap = Zap;
  Info = Info;

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
  
  // Form control values
  checkboxValue1 = false;
  checkboxValue2 = true;
  checkboxValue3 = false;
  radioValue1 = '';
  switchValue1 = true;
  switchValue2 = false;
  switchValue3 = false;
  
  // Progress values
  progressValue = 65;
  
  // Tab values
  activeTabId = 'overview';
  settingsNotifications = true;
  settingsAutoSave = false;
  
  // Modal states
  modals = {
    basic: false,
    form: false,
    confirm: false
  };
  
  // Form data
  formData = {
    name: '',
    email: '',
    contact: ''
  };
  
  // Toast data
  toasts: ToastData[] = [];
  
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
  
  planOptions: RadioOption[] = [
    { value: 'basic', label: 'Basic Plan', helperText: '$9/month - Essential features' },
    { value: 'pro', label: 'Pro Plan', helperText: '$19/month - Advanced features' },
    { value: 'enterprise', label: 'Enterprise Plan', helperText: '$49/month - All features' }
  ];
  
  contactOptions: RadioOption[] = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' }
  ];
  
  tabItems: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: this.BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: this.BarChart3, badge: '2' },
    { id: 'settings', label: 'Settings', icon: this.User }
  ];
  
  accordionItems: AccordionItem[] = [
    { 
      id: 'item-1', 
      title: 'Is it accessible?', 
      content: 'Yes. It adheres to the WAI-ARIA design pattern and is fully keyboard navigable.',
      icon: this.CheckCircle 
    },
    { 
      id: 'item-2', 
      title: 'Is it styled?', 
      content: 'Yes. It comes with default styles that match the other components aesthetic.',
      icon: this.Palette 
    },
    { 
      id: 'item-3', 
      title: 'Is it animated?', 
      content: 'Yes. It includes smooth animations and transitions for a polished user experience.',
      icon: this.Zap 
    }
  ];
  
  dropdownItems: DropdownItem[] = [
    { id: 'edit', label: 'Edit', icon: this.Edit, shortcut: '⌘E' },
    { id: 'copy', label: 'Copy', icon: this.Copy, shortcut: '⌘C' },
    { id: 'separator-1', label: '', separator: true },
    { id: 'delete', label: 'Delete', icon: this.Trash2, destructive: true, shortcut: '⌘⌫' }
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
  
  // Modal methods
  openModal(type: 'basic' | 'form' | 'confirm'): void {
    this.modals[type] = true;
  }
  
  closeModal(type: 'basic' | 'form' | 'confirm'): void {
    this.modals[type] = false;
  }
  
  submitForm(): void {
    console.log('Form submitted:', this.formData);
    this.showToast('success');
    this.closeModal('form');
  }
  
  confirmAction(): void {
    console.log('Action confirmed');
    this.showToast('success');
    this.closeModal('confirm');
  }
  
  // Toast methods
  showToast(variant: 'success' | 'info' | 'error' | 'warning'): void {
    const toastMessages = {
      success: { title: 'Success!', description: 'Your action was completed successfully.' },
      info: { title: 'Information', description: 'Here is some useful information for you.' },
      error: { title: 'Error!', description: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning!', description: 'Please review your input before proceeding.' }
    };
    
    const message = toastMessages[variant];
    const toast: ToastData = {
      id: `toast-${Date.now()}`,
      title: message.title,
      description: message.description,
      variant: variant === 'info' ? 'info' : variant,
      duration: 5000
    };
    
    this.toasts.push(toast);
  }
  
  removeToast(toastId: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== toastId);
  }
  
  onDropdownItemSelected(item: DropdownItem): void {
    console.log('Dropdown item selected:', item);
    this.showToast('info');
  }
}