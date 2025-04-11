// src/types/workflow.ts
import { AgreementType, ClassificationLevel, Agreement } from './types';

// Workflow Status Enums
export enum WorkflowStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ERROR = 'error'
}

export enum StageStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
  ERROR = 'error'
}

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  REASSIGNED = 'reassigned'
}

export enum StageType {
  APPROVAL = 'approval',
  REVIEW = 'review',
  SIGNATURE = 'signature',
  NOTIFICATION = 'notification',
  AUTOMATED = 'automated',
  WAIT = 'wait'
}

export enum ActionType {
  SEND_NOTIFICATION = 'send_notification',
  UPDATE_AGREEMENT = 'update_agreement',
  GENERATE_DOCUMENT = 'generate_document',
  CALL_EXTERNAL_SERVICE = 'call_external_service',
  UPDATE_METADATA = 'update_metadata'
}

export enum ApprovalType {
  ANY = 'any', // Any one approver
  ALL = 'all'  // All approvers must approve
}

// Workflow Template Interfaces
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  version: string;
  agreementTypes: AgreementType[]; // Types this workflow applies to
  stages: WorkflowStageTemplate[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface WorkflowStageTemplate {
  id: string;
  name: string;
  description: string;
  order: number;
  type: StageType;

  // Approval configuration
  approvers?: {
    roles: string[];
    userIds?: string[];
    approvalType: ApprovalType;
    reassignmentAllowed: boolean;
    delegationAllowed: boolean;
  };

  // Time constraints
  timeConstraints?: {
    durationHours: number;
    workingHoursOnly: boolean;
    allowExtension: boolean;
    maxExtensionHours?: number;
  };

  // Conditional routing
  conditionalRouting?: {
    condition: string; // Expression to evaluate
    trueTransition: string; // Stage ID to transition to if true
    falseTransition: string; // Stage ID to transition to if false
  };

  // Default transition (if no conditional routing or condition is not applicable)
  defaultTransition?: string;

  // Actions to perform on entry/exit
  entryActions?: StageAction[];
  exitActions?: StageAction[];

  // Form configuration for user input
  formConfiguration?: {
    formId: string;
    requiredFields: string[];
  };
}

export interface StageAction {
  type: ActionType;
  parameters: Record<string, any>;
}

// Workflow Instance Interfaces
export interface WorkflowInstance {
  id: string;
  templateId: string;
  templateVersion: string;
  agreementId: string;
  status: WorkflowStatus;
  currentStageId: string;
  stageInstances: StageInstance[];
  startedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  createdBy: string;
  metadata: Record<string, any>;
  variables: Record<string, any>; // Runtime variables
}

export interface StageInstance {
  id: string;
  templateStageId: string;
  status: StageStatus;
  startedAt?: string;
  dueAt?: string;
  completedAt?: string;
  assignments: TaskAssignment[];
  actions: ActionRecord[];
  notes: StageNote[];
}

export interface TaskAssignment {
  id: string;
  userId: string;
  role: string;
  assignedAt: string;
  status: TaskStatus;
  completedAt?: string;
  decision?: 'APPROVE' | 'REJECT' | 'RETURN_FOR_REVISION';
  comment?: string;
}

export interface ActionRecord {
  id: string;
  actionType: ActionType;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  executedAt?: string;
  result?: any;
  error?: string;
}

export interface StageNote {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  isPrivate: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}

// Event System Interfaces
export type WorkflowEventType =
  // Workflow lifecycle events
  'WORKFLOW_CREATED' | 'WORKFLOW_STARTED' | 'WORKFLOW_COMPLETED' | 'WORKFLOW_CANCELLED' |
  // Stage lifecycle events
  'STAGE_ACTIVATED' | 'STAGE_COMPLETED' | 'STAGE_SKIPPED' |
  // Task lifecycle events
  'TASK_CREATED' | 'TASK_ASSIGNED' | 'TASK_COMPLETED' | 'TASK_REJECTED' | 'TASK_REASSIGNED' |
  // Time-related events
  'TASK_DUE_SOON' | 'TASK_OVERDUE' | 'STAGE_DUE_SOON' | 'STAGE_OVERDUE' |
  // Document events
  'DOCUMENT_UPDATED' | 'DOCUMENT_SIGNED' |
  // Agreement events
  'AGREEMENT_UPDATED' |
  // Custom events
  'CUSTOM_EVENT';

export interface WorkflowEvent {
  id: string;
  type: WorkflowEventType;
  workflowInstanceId: string;
  stageId?: string;
  taskId?: string;
  userId?: string;
  timestamp: string;
  data: Record<string, any>;
}

// API Request/Response Types
export interface CreateWorkflowTemplateRequest {
  name: string;
  description: string;
  agreementTypes: AgreementType[];
  stages: Omit<WorkflowStageTemplate, 'id'>[];
  metadata?: Record<string, any>;
}

export interface StartWorkflowRequest {
  templateId: string;
  agreementId: string;
  initialVariables?: Record<string, any>;
}

export interface CompleteTaskRequest {
  decision: 'APPROVE' | 'REJECT' | 'RETURN_FOR_REVISION';
  comment?: string;
  formData?: Record<string, any>;
}

export interface ReassignTaskRequest {
  userId: string;
  reason: string;
}

export interface RequestTaskExtensionRequest {
  additionalHours: number;
  reason: string;
}

// Task Interface for API responses
export interface Task {
  id: string;
  workflowInstanceId: string;
  stageInstanceId: string;
  agreementId: string;
  name: string;
  description: string;
  assigneeId: string;
  status: TaskStatus;
  createdAt: string;
  dueAt?: string;
  completedAt?: string;
  formId?: string;
  formData?: Record<string, any>;
  escalation?: {
    supervisorId?: string;
    escalatedAt?: string;
    reason?: string;
  };
}

// Pagination Response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
