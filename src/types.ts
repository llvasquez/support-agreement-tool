export enum AgreementType {
    MOA = 'MOA',
    MOU = 'MOU',
    OTHER = 'OTHER',
    UNKNOWN = 'UNKNOWN'
  }
  
  export enum ClassificationLevel {
    UNCLASSIFIED = 'UNCLASSIFIED',
    CONFIDENTIAL = 'CONFIDENTIAL',
    SECRET = 'SECRET',
    TOP_SECRET = 'TOP_SECRET'
  }
  
  export interface Agreement {
    id: string;
    title: string;
    type: AgreementType;
    status: 'draft' | 'review' | 'final';
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    classificationLevel: ClassificationLevel;
    currentVersionId: string;
    sections: Section[];
  }
  
  export interface Section {
    id: string;
    agreementId: string;
    versionId: string;
    name: string;
    order: number;
    content: string;
    isMandatory: boolean;
    classificationMarking: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
  }
  
  export interface WizardState {
    currentStep: number;
    agreementType: AgreementType;
    determiningFactors: {
      involvesResources: boolean;
      involvesReimbursement: boolean;
      involvesFunding: boolean;
      partiesAllDoD: boolean;
      documentingUnderstanding: boolean;
    };
  }