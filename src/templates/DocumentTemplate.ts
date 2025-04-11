import { Agreement, Section } from '../types/types';

export interface DocumentTemplate {
  getHeader: (classificationLabel: string) => any;
  getFooter: (classificationLabel: string, date: string) => any;
  getTitleBlock: (agreement: Agreement) => any;
  getSection: (section: Section) => any;
}

export class PDFTemplate implements DocumentTemplate {
  getHeader(classificationLabel: string) {
    return {
      left: classificationLabel,
      center: 'Agreement Header',
      right: classificationLabel
    };
  }

  getFooter(classificationLabel: string, date: string) {
    return {
      left: classificationLabel,
      center: date,
      right: classificationLabel
    };
  }

  getTitleBlock(agreement: Agreement) {
    return {
      title: agreement.title,
      firstParty: agreement.firstParty,
      secondParty: agreement.secondParty,
      type: agreement.type
    };
  }

  getSection(section: Section) {
    const cleanContent = section.content
      .replace(/\s+/g, ' ')    // Replace multiple spaces with single space
      .trim();                 // Remove leading/trailing whitespace

    return {
      title: section.name,
      content: `(${section.classificationMarking}) ${cleanContent}`
    };
  }
}

export class DOCXTemplate implements DocumentTemplate {
  getHeader(classificationLabel: string) {
    return {
      text: classificationLabel,
      alignment: 'center',
      bold: true
    };
  }

  getFooter(classificationLabel: string, date: string) {
    return {
      text: `${classificationLabel} | ${date} | ${classificationLabel}`,
      alignment: 'center',
      bold: true
    };
  }

  getTitleBlock(agreement: Agreement) {
    return {
      title: {
        text: agreement.title,
        size: 28,
        alignment: 'center'
      },
      parties: [
        {
          text: agreement.firstParty,
          alignment: 'center'
        },
        {
          text: 'AND',
          alignment: 'center'
        },
        {
          text: agreement.secondParty,
          alignment: 'center'
        }
      ]
    };
  }

  getSection(section: Section) {
    const cleanContent = section.content
      .replace(/\s+/g, ' ')    // Replace multiple spaces with single space
      .trim();                 // Remove leading/trailing whitespace

    return {
      heading: {
        text: section.name,
        bold: true,
        break: 1
      },
      content: {
        text: `(${section.classificationMarking}) ${cleanContent}`,
        spacing: 1.15,
        break: 1
      }
    };
  }
}