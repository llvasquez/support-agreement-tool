import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType } from 'docx';
import { Agreement } from '../types/types';
import { DOCUMENT_MARGINS, FONT_SIZES } from '../constants/exportConstants';

export class ExportService {
  static async exportToPDF(agreement: Agreement, classificationLabel: string): Promise<void> {
    const doc = new jsPDF();
    await this.addDocumentHeader(doc, classificationLabel);
    await this.addDocumentContent(doc, agreement);
    await this.addDocumentFooter(doc, classificationLabel);
    doc.save(`${agreement.title}.pdf`);
  }

  static async exportToDOCX(agreement: Agreement, classificationLabel: string): Promise<void> {
    const doc = await this.createDOCXDocument(agreement, classificationLabel);
    const blob = await Packer.toBlob(doc);
    await this.downloadFile(blob, `${agreement.title}.docx`);
  }

  private static async downloadFile(blob: Blob, filename: string): Promise<void> {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private static async addDocumentHeader(doc: jsPDF, classificationLabel: string): Promise<void> {
    doc.setFontSize(FONT_SIZES.header);
    doc.text(classificationLabel, DOCUMENT_MARGINS.left, DOCUMENT_MARGINS.top);
    doc.text('Agreement Header', doc.internal.pageSize.getWidth() / 2, DOCUMENT_MARGINS.top, { align: 'center' });
    doc.text(classificationLabel, doc.internal.pageSize.getWidth() - DOCUMENT_MARGINS.right, DOCUMENT_MARGINS.top, { align: 'right' });
  }

  private static async addDocumentContent(doc: jsPDF, agreement: Agreement): Promise<void> {
    let yPosition = DOCUMENT_MARGINS.top + 30;

    // Title block
    doc.setFontSize(FONT_SIZES.title);
    doc.text(agreement.title, doc.internal.pageSize.getWidth() / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Add parties
    doc.text('BETWEEN', doc.internal.pageSize.getWidth() / 2, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text(`${agreement.firstParty} (${agreement.firstPartyAcronym})`, doc.internal.pageSize.getWidth() / 2, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text('AND', doc.internal.pageSize.getWidth() / 2, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text(`${agreement.secondParty} (${agreement.secondPartyAcronym})`, doc.internal.pageSize.getWidth() / 2, yPosition, { align: 'center' });

    // Add sections
    doc.setFontSize(FONT_SIZES.content);
  agreement.sections.forEach(section => {
    // Add section title
    doc.setFontSize(FONT_SIZES.subheading);
    doc.text(section.name, DOCUMENT_MARGINS.left, yPosition);
    yPosition += 10;

    // Add section content with classification marking
    doc.setFontSize(FONT_SIZES.content);
    const formattedContent = `(${section.classificationMarking}) ${section.content}`;
    const contentLines = doc.splitTextToSize(
      formattedContent, 
      doc.internal.pageSize.getWidth() - (DOCUMENT_MARGINS.left + DOCUMENT_MARGINS.right)
    );
    doc.text(contentLines, DOCUMENT_MARGINS.left, yPosition);
    yPosition += contentLines.length * 7 + 10; // Add extra spacing between sections
  });
}

  private static async addDocumentFooter(doc: jsPDF, classificationLabel: string): Promise<void> {
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(FONT_SIZES.header);
    doc.text(classificationLabel, DOCUMENT_MARGINS.left, pageHeight - DOCUMENT_MARGINS.bottom);
    doc.text(new Date().toLocaleDateString(), doc.internal.pageSize.getWidth() / 2, pageHeight - DOCUMENT_MARGINS.bottom, { align: 'center' });
    doc.text(classificationLabel, doc.internal.pageSize.getWidth() - DOCUMENT_MARGINS.right, pageHeight - DOCUMENT_MARGINS.bottom, { align: 'right' });
  }

  private static async createDOCXDocument(agreement: Agreement, classificationLabel: string): Promise<Document> {
    const children: Paragraph[] = [];

    // Add title block
    children.push(
      new Paragraph({
        children: [new TextRun({ text: agreement.title, size: 28 })],
        alignment: AlignmentType.CENTER,
      })
    );

    // Add parties
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'BETWEEN', size: 28 })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: agreement.firstParty, size: 28 }),
          new TextRun({ text: ` (${agreement.firstPartyAcronym})`, size: 28 }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [new TextRun({ text: 'AND', size: 28 })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: agreement.secondParty, size: 28 }),
          new TextRun({ text: ` (${agreement.secondPartyAcronym})`, size: 28 }),
        ],
        alignment: AlignmentType.CENTER,
      })
    );

    // Add sections
    agreement.sections.forEach(section => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: section.name, bold: true })],
          spacing: { after: 200 }
        }),
        new Paragraph({
          children: [
            new TextRun({ 
              text: `(${section.classificationMarking}) ${section.content}`,
              break: 1 
            }),
          ],
          spacing: { after: 300 }
        })
      );
    });
  

    return new Document({
      sections: [{
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: classificationLabel, bold: true }),
                  new TextRun({ text: 'Agreement Header', bold: true }),
                  new TextRun({ text: classificationLabel, bold: true }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: classificationLabel, bold: true }),
                  new TextRun({ text: new Date().toLocaleDateString(), bold: true }),
                  new TextRun({ text: classificationLabel, bold: true }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children,
      }],
    });
  }
}