import { Agreement, Section } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

// Define the request and response types for the AI generation
export interface GenerationRequest {
  agreementType: string;
  requirements: string[];
}

export interface GenerationResponse {
  sections: {
    name: string;
    content: string;
  }[];
  error?: string;
}

/**
 * Service for AI-related functionality
 */
export class AIService {
  /**
   * Generate content based on user requirements
   */
  static generateContent(request: GenerationRequest): Promise<GenerationResponse> {
    // In a real implementation, this would call an actual AI service API
    // For demo purposes, we'll just return mock data after a short delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const sections = this.generateMockSections(request);
        resolve({ sections });
      }, 1500); // Simulate API call delay
    });
  }

  /**
   * Apply AI-generated content to an existing agreement
   * Specifically targets 'Background', 'Purpose and Scope', and 'Responsibilities of the Parties' sections
   */
  static applyGeneratedContent(agreement: Agreement, generatedSections: GenerationResponse['sections']): Agreement {
    // Create a deep copy of the agreement to avoid mutating the original
    const updatedAgreement = JSON.parse(JSON.stringify(agreement)) as Agreement;
    
    // Map of target section names to look for in the generated content
    const targetSectionMap = {
      'Background': ['background'],
      'Purpose and Scope': ['purpose', 'scope', 'purpose and scope'],
      'Responsibilities of the Parties': ['responsibilities', 'responsibilities of the parties']
    };
    
    // Process each section in the agreement
    updatedAgreement.sections.forEach(section => {
      // Check if this is a section we want to update
      Object.entries(targetSectionMap).forEach(([targetName, possibleNames]) => {
        if (section.name === targetName) {
          // Find a matching generated section
          const matchingGenerated = generatedSections.find(genSection => 
            possibleNames.includes(genSection.name.toLowerCase())
          );
          
          if (matchingGenerated) {
            // Update the section content
            section.content = matchingGenerated.content;
            section.lastModifiedDate = new Date().toISOString();
          }
        }
      });
    });
    
    // Update the agreement's last modified date
    updatedAgreement.lastModifiedDate = new Date().toISOString();
    
    return updatedAgreement;
  }

  /**
   * Generate mock sections for demo purposes
   * In a real implementation, this would be replaced with actual LLM API calls
   */
  private static generateMockSections(request: GenerationRequest): GenerationResponse['sections'] {
    const { agreementType, requirements } = request;
    
    // Basic sections that would be in most agreements
    const sections = [
      {
        name: 'Purpose and Scope',
        content: `This ${agreementType} establishes the terms and conditions under which the parties will collaborate to ${requirements.join(', ')}.\n\nThis agreement covers all activities related to ${requirements.join(', ')}, including but not limited to planning, execution, monitoring, and evaluation of joint efforts between [First Party] and [Second Party].`
      },
      {
        name: 'Background',
        content: `The [First Party] and [Second Party] have identified a need to ${requirements[0] || 'collaborate on mutual interests'} and have determined that a formal agreement is necessary to outline responsibilities and expectations.\n\nThis collaboration will address the following needs:\n1. ${requirements[0] || 'Establish a framework for cooperation'}\n2. ${requirements[1] || 'Define roles and responsibilities'}\n3. ${requirements[2] || 'Set performance metrics and success criteria'}\n\nBoth parties acknowledge the importance of this agreement in furthering their respective missions.`
      }
    ];
    
    // Add specific sections based on agreement type
    if (agreementType === 'MOA') {
      sections.push({
        name: 'Financial Arrangements',
        content: `The financial responsibilities for this agreement are as follows: [First Party] will be responsible for ${requirements[1] || 'providing funding as outlined in Appendix A'}. [Second Party] will be responsible for ${requirements[2] || 'providing in-kind contributions as outlined in Appendix B'}.`
      });
    }
    
    // Add responsibilities section
    sections.push({
      name: 'Responsibilities',
      content: `\n[First Party] Responsibilities:\n1. ${requirements[0] || 'Provide oversight and direction for the project'}\n2. ${requirements[1] || 'Allocate necessary resources as outlined in this agreement'}\n3. ${requirements[2] || 'Ensure compliance with applicable regulations and policies'}\n\n[Second Party] Responsibilities:\n1. ${requirements[3] || 'Execute the operational aspects of the project'}\n2. ${requirements[4] || 'Report progress on a regular basis'}\n3. ${requirements[5] || 'Maintain records of all activities and expenditures'}`
    });
    
    return sections;
  }
}
