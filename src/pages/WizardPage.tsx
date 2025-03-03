import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import Layout from '../components/layout/Layout';
import { createAgreement } from '../store/slices/agreementSlice';
import AgreementTypeStep from '../components/wizard/AgreementTypeStep';
import BasicInformationStep from '../components/wizard/BasicInformationStep';
import { AgreementType, ClassificationLevel } from '../types/types';

const WizardPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.wizard.currentStep);
  const AgreementType = useSelector((state: RootState) => state.wizard.agreementType);

  //This is a test agreement that will be loaded in.
  useEffect(() => {
    if (AgreementType !== AgreementType.UNKNOWN) {
      dispatch(createAgreement({
        type: AgreementType,
        title: 'Test Agreement', 
        classificationLevel: ClassificationLevel.UNCLASSIFIED,
        author: 'Test Author'
      }));
    }
  }, [AgreementType, dispatch]);

  return (
    <div>
      {currentStep === 1 && <AgreementTypeStep />}
      {currentStep === 2 && <BasicInformationStep />}
      {/* Add more steps as needed */}
      {currentStep > 2 && <div>This step doesn't exist yet.</div>}
    </div>
  );
};

export default WizardPage;

