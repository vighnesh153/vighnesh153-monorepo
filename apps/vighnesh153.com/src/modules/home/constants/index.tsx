import { commonConstants, UnderlinedAnimationLink } from '@modules/common';

export const homeModuleConstants = {
  pageTitle: 'Vighnesh Raut - the man, the myth, the living legend himself',
  pageDescription:
    'Vighnesh is a Software Engineer who specializes in building exceptional ' +
    'web interfaces. He also loves to dabble with Physics and Mathematics. ' +
    'When bored, you can find him watching Netflix on his bed.',
  sections: {
    introduction: {
      caption: 'Hi, my name is',
      title: 'Vighnesh Raut.',
      subtitle: 'I build things, mostly for the web.',
      summary:
        'I am a Software Engineer specializing in building exceptional ' +
        'digital experiences. Currently, I’m focused on building accessible, ' +
        'human-centered products for different causes.',
    },
    aboutMe: {
      count: '01',
      title: 'About me',
      summary: (
        <>
          Hello. My name is Vighnesh and I enjoy creating things that live mostly on the web. My interest in software
          development started a few years back when I first learnt about Javascript. Since then, I have been building
          teeny-tiny projects for the web and cli for fun.
          <br />
          <br />
          Fast-forward to today, and I have had the privilege to work for{' '}
          <UnderlinedAnimationLink href={commonConstants.work.google.url} target="_blank">
            Google
          </UnderlinedAnimationLink>
          ,{' '}
          <UnderlinedAnimationLink href={commonConstants.work.amazon.url} target="_blank">
            Amazon
          </UnderlinedAnimationLink>
          ,{' '}
          <UnderlinedAnimationLink href={commonConstants.work.smarterCodes.url} target="_blank">
            an AI startup
          </UnderlinedAnimationLink>{' '}
          and{' '}
          <UnderlinedAnimationLink href={commonConstants.work.tavisca.url} target="_blank">
            a loyalty rewards company
          </UnderlinedAnimationLink>
          .
          <br />
          <br />
          My Main focus these days is building next-gen developer tools for GoogleTV at{' '}
          <UnderlinedAnimationLink href={commonConstants.work.google.url} target="_blank">
            Google
          </UnderlinedAnimationLink>
          .
        </>
      ),
      subSummary: 'Here are a few technologies I have been working with recently:',
      technologies: ['Rust (programming language)', 'Typescript', 'Kotlin', 'Amazon Web Services', 'React.js', 'Java'],
    },
  },
};
