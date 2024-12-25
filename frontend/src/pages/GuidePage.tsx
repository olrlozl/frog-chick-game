import 'styles/pages/guide-page.scss';
import Logout from 'components/account/Logout';
import { NavBar } from 'components/common/NavBar/NavBar';
import GuideItem from 'components/guide/GuideItem';

const GuidePage = () => {
  return (
    <div className="guide-page">
      <section>
        <GuideItem title="게임룰" guideOption="rule" />
        <GuideItem title="조작법" guideOption="control" />
      </section>
      <Logout />
      <NavBar />
    </div>
  );
};

export default GuidePage;
