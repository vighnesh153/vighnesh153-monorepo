import { CommonComponents } from '@modules/common';
import { homeModuleConstants } from '../constants';

export function HomePage() {
  return (
    <>
      <CommonComponents.Head>
        <title>{homeModuleConstants.pageTitle}</title>
        <meta name="description" content={homeModuleConstants.pageDescription} />
      </CommonComponents.Head>

      <CommonComponents.SkipToMainContent />
      <CommonComponents.Navbar />
      <CommonComponents.AsideSocialLinks />

      <main id="main">
        {/* <iframe */}
        {/*  title="my resume" */}
        {/*  src="https://drive.google.com/file/d/1u_8oDHemUAYZdO99AGEYX8iqRrl3lNGO/preview" */}
        {/*  width="300" */}
        {/*  // height="480" */}
        {/*  style={{ aspectRatio: '1/1.270' }} */}
        {/*  allow="autoplay" */}
        {/* /> */}
      </main>
    </>
  );
}
