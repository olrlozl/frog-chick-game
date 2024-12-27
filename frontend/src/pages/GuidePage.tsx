import Logout from 'components/account/Logout';
import GuideBalloon from 'components/guide/GuideBalloon';
import 'styles/pages/guide-page.scss';
import farmer from 'assets/images/farmer.png';
import pond from 'assets/images/pond.png';
import { useState } from 'react';
import { GuideOptionType } from 'types/guide';

const GuidePage = () => {
  const [selectedOption, setSelectedOption] = useState<GuideOptionType>('rule');

  let guideImage = selectedOption === 'rule' ? pond : farmer;

  const toggleSelectedOption = (nextOption: GuideOptionType) => {
    if (nextOption !== selectedOption)
      setSelectedOption((prev) => (prev === 'rule' ? 'control' : 'rule'));
  };

  return (
    <div className="guide-page">
      <GuideBalloon option={selectedOption} onClick={toggleSelectedOption} />
      <img src={guideImage} alt="" />
      <Logout />
    </div>
  );
};

export default GuidePage;
