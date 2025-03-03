// src/data/agreementTemplates.ts
import { AgreementType, Template } from '../types/types'; // Import Template

export const MOA_TEMPLATE: Template = {
  type: AgreementType.MOA,
  title: 'Memorandum of Agreement',
  description: 'A binding agreement establishing a reimbursable or non-reimbursable support relationship.',
  version: '1.0.0',
  lastUpdated: new Date('2025-02-01'),
  sections: [
    {
      id: 'purpose',
      name: 'Purpose',
      content: 'This Memorandum of Agreement (MOA) establishes the terms and conditions under which [Supporting DoD Component] will provide support to [Supported DoD Component] in accordance with DoDI 4000.19.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'scope',
      name: 'Scope',
      content: 'This agreement covers the following support: [Detailed description of the support to be provided].',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'responsibilities',
      name: 'Responsibilities',
      content: `a. [Supporting DoD Component] Responsibilities:
1. [List specific responsibilities]
2. [List specific responsibilities]

b. [Supported DoD Component] Responsibilities:
1. [List specific responsibilities]
2. [List specific responsibilities]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'funding',
      name: 'Funding Arrangements',
      content: 'This agreement is [reimbursable/non-reimbursable]. [Include specific funding details, costs, payment schedules, and billing procedures if reimbursable].',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'duration',
      name: 'Duration and Termination',
      content: 'This agreement will be effective upon signature of all parties and will remain in effect for [time period], unless terminated earlier. Either party may terminate this agreement with [X] days written notice.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'resolution',
      name: 'Dispute Resolution',
      content: 'Disputes related to this agreement will be resolved at the lowest operational level possible. Unresolved issues will be progressively elevated through respective chains of command.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'approval',
      name: 'Approval',
      content: `APPROVED:

________________________           ____________
[Supporting Official Name]         Date
[Supporting Official Title]
[Supporting DoD Component]

________________________           ____________
[Supported Official Name]          Date
[Supported Official Title]
[Supported DoD Component]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'appendices',
      name: 'Appendices',
      content: '[List any appendices or attachments]',
      isMandatory: false,
      classificationMarking: ''
    },
  ],
};

export const MOU_TEMPLATE: Template = {
  type: AgreementType.MOU,
  title: 'Memorandum of Understanding',
  description: 'A non-binding agreement documenting mutual understanding and planned actions.',
  version: '1.0.0',
  lastUpdated: new Date('2025-02-01'),
  sections: [
    {
      id: 'purpose',
      name: 'Purpose',
      content: 'This Memorandum of Understanding (MOU) documents the mutual understanding between [Party A] and [Party B] regarding [brief description of the mutual understanding].',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'background',
      name: 'Background',
      content: '[Provide context and background information relevant to this understanding]',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'understanding',
      name: 'Understanding',
      content: `The parties understand that:
1. [Key point of understanding]
2. [Key point of understanding]
3. [Key point of understanding]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'actions',
      name: 'Planned Actions',
      content: `a. [Party A] plans to:
1. [Planned action]
2. [Planned action]

b. [Party B] plans to:
1. [Planned action]
2. [Planned action]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'nonbinding',
      name: 'Non-Binding Nature',
      content: 'This MOU is not legally binding and does not obligate funds, personnel, or other resources of the parties. This MOU does not create any right or benefit enforceable against the parties.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'duration',
      name: 'Duration and Modification',
      content: 'This MOU will be effective upon signature of all parties and will remain in effect for [time period], unless terminated earlier. This MOU may be modified by mutual written agreement of the parties.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'signatures',
      name: 'Signatures',
      content: `ACKNOWLEDGED:

________________________           ____________
[Party A Official Name]            Date
[Party A Official Title]
[Party A Organization]

________________________           ____________
[Party B Official Name]            Date
[Party B Official Title]
[Party B Organization]`,
      isMandatory: true,
      classificationMarking: ''
    },
  ],
};

export const getTemplateByType = (type: AgreementType): Template => {
  switch (type) {
    case AgreementType.MOA:
      return MOA_TEMPLATE;
    case AgreementType.MOU:
      return MOU_TEMPLATE;
    default:
      throw new Error(`Template for agreement type ${type} not found`);
  }
};
