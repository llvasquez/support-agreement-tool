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
      content: 'Each Party is responsible for all costs of its personnel, including pay and benefits, support, and travel.  Each Party is responsible for supervision and management of its personnel.',
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
      content: 'If non-reimbursable, this MOA will be reviewed no less often than mid-point on or around the anniversary of its effective date in its entirety. If reimbursable, this MOA will be reviewed on or around the anniversary of its effective date annually for financial impacts; if there are substantial changes in resource requirements, the agreement will be reviewed in its entirety.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'modification of agreement',
      name: 'Modification of Agreement',
      content: 'This MOA may only be modified by the written agreement of the Parties, duly signed by their authorized representatives.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
    id: 'disuptes',
    name: 'Dispute Resolution',
    content: 'Any disputes relating to this MOA will, subject to any applicable law, Executive Order, or DoD issuance, be resolved by consultation between the Parties.',
    isMandatory: true,
    classificationMarking: ''
    },
    {
      id: 'termination',
      name: 'Termination of Agreement',
      content: 'This MOA may be terminated by either Party by giving at least __ days’ written notice to the other Party.  The MOA may also be terminated at any time upon the mutual written consent of the Parties.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'transferability',
      name: 'Transferability',
      content: 'This MOA is not transferable except with the written consent of the Parties.',
      isMandatory: false,
      classificationMarking: ''
    },
    {
      id: 'entire agreement',
      name: 'Entire Agreement',
      content: 'It is expressly understood and agreed that this MOA embodies the entire agreement between the Parties regarding the MOA’s subject matter, thereby merging and superseding all prior agreements and representations by the Parties with respect to such subject matter.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'funding and manpower',
      name: 'Funds and Manpower',
      content: 'This MOA neither documents nor provides for the exchange of funds or manpower between the Parties, nor does it make any commitment of funds or resources.  No provision in this MOA will be interpreted to require obligation or payment of funds.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'duration',
      name: 'Duration and Termination',
      content: 'This agreement will be effective upon signature of all parties and will remain in effect for no longer than 10 years from the effective date, unless terminated earlier. Either party may terminate this agreement with [X] days written notice.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'severability',
      name: 'Severability',
      content: 'If any term, provision, or condition of this MOA is held to be invalid, void, or unenforceable by a governmental authority and such holding is not or cannot be appealed further, then such invalid, void, or unenforceable term, provision, or condition shall be deemed severed from this MOA and all remaining terms, provisions, and conditions of this MOA shall continue in full force and effect.  The Parties shall endeavor in good faith to replace such invalid, void, or unenforceable term, provision, or condition with valid and enforceable terms, provisions, or conditions which achieve the purpose intended by the Parties to the greatest extent permitted by law.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'approval',
      name: 'Approval - Approval authority signature will never be alone on a blank page',
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
      id: 'introduction',
      name: 'Introduction',
      content: 'This is a memorandum of agreement (MOU) between the [First Party] and the [Second Party][if the Second Party is a non-governmental entity, include its address]. When referred to collectively, the [First Party] and the [Second Party] are referred to as the “Parties.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'background',
      name: 'Background',
      content: 'If there is a need to discuss background, do so here. Normally, there is no need to discuss the background or provide justification for the MOU, particularly if between OSD or DoD Components. Occasionally, however, there is a desire to explain the need for the MOU; particularly where it is not self-evident from the purpose or it is with another federal agency.',
      isMandatory: false,
      classificationMarking: ''
    },
    {
      id: 'authorities',
      name: 'Authorities',
      content: 'List any applicable authorities',
      isMandatory: false,
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
      content: 'Each Party is responsible for all costs of its personnel, including pay and benefits, support, and travel.  Each Party is responsible for supervision and management of its personnel.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'Points of Contact',
      name: 'Points of Contact (POCs)',
      content: `The following POCs will be used by the Parites to communicate matters concerning this MOU. Each party may chnage its POC upon reasonable notice to the other party.
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
      content: `All correspondence to be sent and notices to be given pursuant to this MOU will be addressed, if to the [First party], to:
      a. [Insert mailing address] 
b. and, if to the  [Second Party] 
      1. [Insert mailing address]`,
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'funding and manpower',
      name: 'Funds and Manpower',
      content: 'This MOU neither documents nor provides for the exchange of funds or manpower between the Parties, nor does it make any commitment of funds or resources.  No provision in this MOU will be interpreted to require obligation or payment of funds.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'modification of agreement',
      name: 'Modification of Agreement',
      content: 'This MOU may only be modified by the written agreement of the Parties, duly signed by their authorized representatives.  This MOU will be reviewed no less often than at the mid-point of its term and around the anniversary of its effective date in its entirety.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
    id: 'disuptes',
    name: 'Dispute Resolution',
    content: 'Any disputes relating to this MOU will, subject to any applicable law, Executive Order, or DoD issuance, be resolved by consultation between the Parties.',
    isMandatory: true,
    classificationMarking: ''
    },
    {
      id: 'termination',
      name: 'Termination of Agreement',
      content: 'This MOU may be terminated by either Party by giving at least __ days written notice to the other Party.  The MOU may also be terminated at any time upon the mutual written consent of the Parties.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'transferability',
      name: 'Transferability',
      content: 'This MOU is not transferable except with the written consent of the Parties.',
      isMandatory: false,
      classificationMarking: ''
    },
    {
      id: 'entire agreement',
      name: 'Entire Agreement',
      content: 'It is expressly understood and agreed that this MOU embodies the entire agreement between the Parties regarding the MOUs subject matter, thereby merging and superseding all prior agreements and representations by the Parties with respect to such subject matter.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'funding and manpower',
      name: 'Funds and Manpower',
      content: 'This MOU neither documents nor provides for the exchange of funds or manpower between the Parties, nor does it make any commitment of funds or resources.  No provision in this MOA will be interpreted to require obligation or payment of funds.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'duration',
      name: 'Duration and Termination',
      content: 'This agreement will be effective upon signature of all parties and will remain in effect for no longer than 10 years from the effective date, unless terminated earlier. Either party may terminate this agreement with [X] days written notice.',
      isMandatory: true,
      classificationMarking: ''
    },
    {
      id: 'severability',
      name: 'Severability',
      content: 'If any term, provision, or condition of this MOU is held to be invalid, void, or unenforceable by a governmental authority and such holding is not or cannot be appealed further, then such invalid, void, or unenforceable term, provision, or condition shall be deemed severed from this MOU and all remaining terms, provisions, and conditions of this MOU shall continue in full force and effect.  The Parties shall endeavor in good faith to replace such invalid, void, or unenforceable term, provision, or condition with valid and enforceable terms, provisions, or conditions which achieve the purpose intended by the Parties to the greatest extent permitted by law.',
      isMandatory: false,
      classificationMarking: ''
    },
    {
      id: 'signatures',
      name: 'Signatures - Approval authority signature will never be alone on a blank page',
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
