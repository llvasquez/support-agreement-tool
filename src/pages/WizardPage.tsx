import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Layout from '../components/layout/Layout';
import AgreementTypeStep from '../components/wizard/AgreementTypeStep';

const WizardPage: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.agreement.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AgreementTypeStep />;
      case 2:
        return <div>Basic Information Step (To be implemented)</div>;
      case 3:
        return <div>Agreement Details Step (To be implemented)</div>;
      case 4:
        return <div>Classification Step (To be implemented)</div>;
      case 5:
        return <div>Review & Export Step (To be implemented)</div>;
      default:
        return <AgreementTypeStep />;
    }
  };

  return <Layout>{renderStep()}</Layout>;
};

export default WizardPage;