// src/pages/WizardPage.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { createAgreement } from '../store/slices/agreementSlice';
import AgreementTypeStep from '../components/wizard/AgreementTypeStep';
import BasicInformationStep from '../components/wizard/BasicInformationStep';
import AgreementDetailsStep from '../components/wizard/AgreementDetailsStep';
import ReviewExportStep from '../components/wizard/ReviewExportStep';
import { AgreementType, ClassificationLevel } from '../types/types';

const Wizard: React.FC = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.wizard.currentStep);
  const agreementType = useSelector((state: RootState) => state.wizard.agreementType); // Correctly get agreementType

  //This is a test agreement that will be loaded in.
  useEffect(() => {
    if (agreementType !== AgreementType.UNKNOWN) { // Compare the value, not the enum itself
      dispatch(createAgreement({
        type: agreementType, // Use the value from Redux, not the enum
        classificationLevel: ClassificationLevel.UNCLASSIFIED,
        author: 'Test Author'
      }));
    }
  }, [agreementType, dispatch]);

  return (
    <div>
      {currentStep === 1 && <AgreementTypeStep />}
      {currentStep === 2 && <BasicInformationStep />}
      {currentStep === 3 && <AgreementDetailsStep />} 
      {currentStep === 4 && <ReviewExportStep />} {/* Render the new step */}
      {currentStep > 4 && <div>This step doesn't exist yet.</div>}
    </div>
  );
};

export default Wizard;
