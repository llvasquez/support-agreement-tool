  export enum AgreementType {
    MOA = 'MEMORANDUM OF AGREEMENT',
    MOU = 'MEMORANDUM OF UNDERSTANDING',
    OTHER = 'OTHER',
    UNKNOWN = 'UNKNOWN'
  }

  export enum ClassificationLevel {
    UNCLASSIFIED = 'UNCLASSIFIED',
    CONFIDENTIAL = 'CUI',
    SECRET = 'SECRET',
    TOP_SECRET = 'TOP_SECRET'
  }

  export const getClassificationLabel = (level: ClassificationLevel): string => {
  switch (level) {
    case ClassificationLevel.UNCLASSIFIED:
      return "Unclassified";
    case ClassificationLevel.CONFIDENTIAL:
      return "Confidential";
    case ClassificationLevel.SECRET:
      return "Secret";
    case ClassificationLevel.TOP_SECRET:
      return "Top Secret";
    default:
      return "Unknown";
  }
};

export interface PointOfContact {
  name: string;
  position: string;
  office: string;
  phone: string;
  email: string;
}

export interface Agreement {
  id: string;
  title: string;
  displayName?: string; // Name to display in the Recent Agreements list
  type: AgreementType;
  status: 'draft' | 'review' | 'final';
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  classificationLevel: ClassificationLevel;
  currentVersionId: string;
  sections: Section[];
  firstParty?: string;
  firstPartyAcronym?: string;
  firstPartyAddress?: string; // Mailing address for first party
  secondParty?: string;
  secondPartyAcronym?: string;
  secondPartyAddress?: string; // Mailing address for second party
  subject?: string;
  agreementNumber?: string;
  firstPartyPOC?: PointOfContact;
  secondPartyPOC?: PointOfContact;
  firstPartyAlternatePOC?: PointOfContact;
  secondPartyAlternatePOC?: PointOfContact;
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
    currentAgreement: Agreement | null;
  }

  export interface Template {
    type: AgreementType;
    title: string;
    description: string;
    version: string;
    lastUpdated: Date;
    sections: {
      id: string;
      name: string;
      content: string;
      isMandatory: boolean;
      classificationMarking: string;
    }[];
}
