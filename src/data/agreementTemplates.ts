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
      id: 'introduction',
      name: 'Introduction',
      content: 'This is a memorandum of agreement (MOA) between the [First Party] and the [Second Party][if the Second Party is a non-governmental entity, include its address]. When referred to collectively, the [First Party] and the [Second Party] are referred to as the “Parties.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'background',
      name: 'Background',
      content: 'If there is a need to discuss background, do so here. Normally, there is no need to discuss the background or provide justification for the MOA, particularly if between OSD or DoD Components. Occasionally, however, there is a desire to explain the need for the MOA; particularly where it is not self-evident from the purpose or it is with another federal agency.',
      isMandatory: false,
      classificationMarking: ''
    },
    {
      id: 'authorities',
      name: 'Authorities',
      content: 'State the legal authority upon which the reimbursable MOA is based, such as the Economy Act, or any other legal or significant authority that authorizes any such actions associated with this MOA. Discuss the authorities of the Parties here. If the other Party is another federal agency and insists on stating what it believes to be its own authority, preface that assertion with “The [Party] asserts the following authority:” The DoD has no obligation to agree with such assertions of authority by other federal agencies.]',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'purpose and scope',
      name: 'Purpose and Scope',
      content: 'This agreement covers the following support: [Detailed description of the support to be provided].',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'responsibilities of the parties',
      name: 'Responsibilities of the Parties',
      content: `a. [First Party] Responsibilities:
1. [List specific responsibilities]
2. [List specific responsibilities]

b. [Second Party] Responsibilities:
1. [List specific responsibilities]
2. [List specific responsibilities]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'personnel',
      name: 'Personnel',
      content: '',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'Points of Contact',
      name: 'Points of Contact (POCs)',
      content: `The following POCs will be used by the Parites to communicate matters concerning this MOA. Each party may chnage itsPOC upon reasonable notice to the other party.
a. For the [First Party] 
  1. [Name, position, office identification, phone number and email of primary POC]
  2. [Name, position, office identification, phone number and email of alternate POC]

b. For the [Second Party] 
  1. [Name, position, office identification, phone number and email of primary POC]
  2. [Name, position, office identification, phone number and email of alternate POC]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'correspondence',
      name: 'Correspondence',
      content: `All correspondence to be sent and notices to be given pursuant to this MOA will be addressed, if to the [First party], to:
      a. [Insert mailing address] 
b. and, if to the  [Second Party] 
      1. [Insert mailing address]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'review of agreement',
      name: 'Review of Agreement',
      content: 'If non-reimbursable, this MOA will be reviewed no less often than mid-point on or around the anniversary of its effective date in its entirety. If reimbursable, this MOA will be reviewed on or around the anniversary of its effective date annually for financial impacts; if there are substantial changes in resource requirements, the agreement will be reviewed in its entirety..',
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
