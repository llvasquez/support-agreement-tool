import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFirstParty,
  selectFirstPartyAcronym,
  selectSecondParty,
  selectSecondPartyAcronym,
  selectSubject,
  selectAgreementNumber,
} from '../store/store';
import { RootState } from '../store/store';

interface SectionProps {
  content: string;
  classificationMarking: string;
  name: string;
  id: string;
}

const Section: React.FC<SectionProps> = ({ content, classificationMarking, name, id }) => {
  return (
    <div className="section" id={id}>
      <h2 style={{ textTransform: 'uppercase' }}>{name}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div>{classificationMarking}</div>
    </div>
  );
};

export default Section;
