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

  // Get the current agreement from the store
  const currentAgreement = useSelector((state: RootState) => state.agreement.currentAgreement);

  // Only create a new agreement if one doesn't already exist and the agreement type is known
  useEffect(() => {
    if (agreementType !== AgreementType.UNKNOWN && !currentAgreement) {
      dispatch(createAgreement({
        type: agreementType,
        classificationLevel: ClassificationLevel.UNCLASSIFIED,
        author: 'Test Author'
      }));
    }
  }, [agreementType, dispatch, currentAgreement]);

  return (
    <div>
      {currentStep === 1 && <AgreementTypeStep />}
      {currentStep === 2 && <BasicInformationStep />}
      {currentStep === 3 && <AgreementDetailsStep />}
      {currentStep === 4 && <ReviewExportStep />}
    </div>
  );
};

export default Wizard;
