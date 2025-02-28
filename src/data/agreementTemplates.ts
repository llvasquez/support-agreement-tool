// src/data/agreementTemplates.ts
import { AgreementTemplate, AgreementType } from '../types/agreements';

export const MOA_TEMPLATE: AgreementTemplate = {
  type: AgreementType.MOA,
  title: 'Memorandum of Agreement',
  description: 'A binding agreement establishing a reimbursable or non-reimbursable support relationship.',
  version: '1.0.0',
  lastUpdated: new Date('2025-02-01'),
  sections: [
    {
      id: 'purpose',
      title: 'Purpose',
      content: 'This Memorandum of Agreement (MOA) establishes the terms and conditions under which [Supporting DoD Component] will provide support to [Supported DoD Component] in accordance with DoDI 4000.19.',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'scope',
      title: 'Scope',
      content: 'This agreement covers the following support: [Detailed description of the support to be provided].',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'responsibilities',
      title: 'Responsibilities',
      content: `a. [Supporting DoD Component] Responsibilities:
1. [List specific responsibilities]
2. [List specific responsibilities]

b. [Supported DoD Component] Responsibilities:
1. [List specific responsibilities]
2. [List specific responsibilities]`,
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'funding',
      title: 'Funding Arrangements',
      content: 'This agreement is [reimbursable/non-reimbursable]. [Include specific funding details, costs, payment schedules, and billing procedures if reimbursable].',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'duration',
      title: 'Duration and Termination',
      content: 'This agreement will be effective upon signature of all parties and will remain in effect for [time period], unless terminated earlier. Either party may terminate this agreement with [X] days written notice.',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'resolution',
      title: 'Dispute Resolution',
      content: 'Disputes related to this agreement will be resolved at the lowest operational level possible. Unresolved issues will be progressively elevated through respective chains of command.',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'approval',
      title: 'Approval',
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
      portionMarking: 'U',
    },
    {
      id: 'appendices',
      title: 'Appendices',
      content: '[List any appendices or attachments]',
      isMandatory: false,
      portionMarking: 'U',
    },
  ],
};

export const MOU_TEMPLATE: AgreementTemplate = {
  type: AgreementType.MOU,
  title: 'Memorandum of Understanding',
  description: 'A non-binding agreement documenting mutual understanding and planned actions.',
  version: '1.0.0',
  lastUpdated: new Date('2025-02-01'),
  sections: [
    {
      id: 'purpose',
      title: 'Purpose',
      content: 'This Memorandum of Understanding (MOU) documents the mutual understanding between [Party A] and [Party B] regarding [brief description of the mutual understanding].',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'background',
      title: 'Background',
      content: '[Provide context and background information relevant to this understanding]',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'understanding',
      title: 'Understanding',
      content: `The parties understand that:
1. [Key point of understanding]
2. [Key point of understanding]
3. [Key point of understanding]`,
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'actions',
      title: 'Planned Actions',
      content: `a. [Party A] plans to:
1. [Planned action]
2. [Planned action]

b. [Party B] plans to:
1. [Planned action]
2. [Planned action]`,
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'nonbinding',
      title: 'Non-Binding Nature',
      content: 'This MOU is not legally binding and does not obligate funds, personnel, or other resources of the parties. This MOU does not create any right or benefit enforceable against the parties.',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'duration',
      title: 'Duration and Modification',
      content: 'This MOU will be effective upon signature of all parties and will remain in effect for [time period], unless terminated earlier. This MOU may be modified by mutual written agreement of the parties.',
      isMandatory: true,
      portionMarking: 'U',
    },
    {
      id: 'signatures',
      title: 'Signatures',
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
      portionMarking: 'U',
    },
  ],
};

export const getTemplateByType = (type: AgreementType): AgreementTemplate => {
  switch (type) {
    case AgreementType.MOA:
      return MOA_TEMPLATE;
    case AgreementType.MOU:
      return MOU_TEMPLATE;
    default:
      throw new Error(`Template for agreement type ${type} not found`);
  }
};