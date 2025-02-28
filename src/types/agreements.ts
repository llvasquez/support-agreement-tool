// src/types/agreement.ts
export enum AgreementType {
    MOA = 'MOA',
    MOU = 'MOU',
  }
  
  export enum ClassificationLevel {
    UNCLASSIFIED = 'UNCLASSIFIED',
    CONFIDENTIAL = 'CONFIDENTIAL',
    SECRET = 'SECRET',
    TOP_SECRET = 'TOP_SECRET',
  }
  
  export interface Section {
    id: string;
    title: string;
    content: string;
    isMandatory: boolean;
    portionMarking: string;
  }
  
  export interface AgreementTemplate {
    type: AgreementType;
    title: string;
    description: string;
    sections: Section[];
    version: string;
    lastUpdated: Date;
  }
  
  export interface Agreement {
    id: string;
    type: AgreementType;
    title: string;
    sections: Section[];
    classificationLevel: ClassificationLevel;
    created: Date;
    lastModified: Date;
    version: string | number;
    authors: string[];
    status: 'draft' | 'review' | 'approved';
  }