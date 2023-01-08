import { commonConstants, UnderlinedAnimationLink } from '@modules/common';

const appstoreDeveloperConsole = (
  <UnderlinedAnimationLink href="https://developer.amazon.com/apps-and-games" target="_blank">
    Appstore Developer Console
  </UnderlinedAnimationLink>
);

function getTimeDifference(from: Date, toDate: Date = new Date()): string {
  const totalMonths = (toDate.getFullYear() - from.getFullYear()) * 12 + (toDate.getMonth() - from.getMonth() + 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return [years > 0 ? `${years} yr` : '', months > 0 ? `${months} mos` : ''].join(' ');
}

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
    experience: {
      count: '02',
      title: 'Where I have worked',
      companies: [
        {
          companyName: 'Google',
          companyUrl: commonConstants.work.google.url,
          totalDuration: <>{getTimeDifference(new Date('2022-07-14'))}</>,
          positions: [
            {
              title: 'Software Engineer 2',
              duration: <>July 2022 - Present · {getTimeDifference(new Date('2022-07-14'))}</>,
            },
          ],
          responsibilities: [
            <>Building next-gen developer tools for GoogleTV</>,
            <>
              Google App Verification System for validating integration flows like <strong>Playnext</strong>
              and <strong>Deeplink</strong> validation between GoogleTV and {`developer's`} apps
            </>,
          ],
        },
        {
          companyName: 'Amazon',
          companyUrl: commonConstants.work.amazon.url,
          totalDuration: <>{getTimeDifference(new Date('2020-09-28'), new Date('2022-07-14'))}</>,
          positions: [
            {
              title: 'Front End Engineer 1',
              duration: (
                <>June 2022 - July 2022 · {getTimeDifference(new Date('2022-06-01'), new Date('2022-07-14'))}</>
              ),
            },
            {
              title: 'Web Development Engineer 1',
              duration: (
                <>September 2020 - May 2022 · {getTimeDifference(new Date('2020-09-28'), new Date('2022-05-31'))}</>
              ),
            },
          ],
          responsibilities: [
            <>
              Working on the revamp of App Submission flow on {appstoreDeveloperConsole} where developers can submit
              their mobile or web applications to be available on Amazon Appstore
            </>,
            <>
              Worked on an internal tool which is a one stop solution for everything related to the{' '}
              <UnderlinedAnimationLink href="https://www.amazon.jobs/en/landing_pages/about-amazon" target="_blank">
                Day 1 culture
              </UnderlinedAnimationLink>{' '}
              of Amazon. The tool is accessible to all the Amazon employees
            </>,
            <>
              Working on an internal React Components Library which will be used by entire Appstore to build standard
              and accessible UI for all the web pages on {appstoreDeveloperConsole}
            </>,
            <>
              Worked on an internal tool which was used by Appstore certifiers, to certify/flag all the apps that were
              submitted on {appstoreDeveloperConsole} based on internal policies
            </>,
            'Writing modern, performant, maintainable code for a diverse array of ' +
              'other Amazon external and internal projects',
            <>
              Working with a variety of different languages, platforms, frameworks, and content management systems such
              as{' '}
              <UnderlinedAnimationLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
                Javascript
              </UnderlinedAnimationLink>
              ,{' '}
              <UnderlinedAnimationLink href="https://www.typescriptlang.org" target="_blank">
                Typescript
              </UnderlinedAnimationLink>
              ,{' '}
              <UnderlinedAnimationLink href="https://reactjs.org" target="_blank">
                ReactJS
              </UnderlinedAnimationLink>
              ,{' '}
              <UnderlinedAnimationLink href="https://nextjs.org" target="_blank">
                NextJS
              </UnderlinedAnimationLink>
              ,{' '}
              <UnderlinedAnimationLink href="https://aws.amazon.com" target="_blank">
                AWS
              </UnderlinedAnimationLink>
              , internal-AWS, Java, Spring, JSP
            </>,
            'Communicating with multi-disciplinary teams of engineers, designers, ' +
              'program managers, and stakeholders on a daily basis',
          ],
        },
        {
          companyName: 'Smarter Codes',
          companyUrl: commonConstants.work.smarterCodes.url,
          totalDuration: <>{getTimeDifference(new Date('2020-07-06'), new Date('2020-09-25'))}</>,
          positions: [
            {
              title: 'Full Stack Engineer',
              duration: (
                <>July 2020 - September 2020 · {getTimeDifference(new Date('2020-07-06'), new Date('2020-09-25'))}</>
              ),
            },
          ],
          responsibilities: [
            <>
              Implemented many of the{' '}
              <UnderlinedAnimationLink href="https://rocket.chat" target="_blank">
                Rocket Chat
              </UnderlinedAnimationLink>{' '}
              features for the{' '}
              <UnderlinedAnimationLink href="https://mattermost.com" target="_blank">
                Mattermost
              </UnderlinedAnimationLink>{' '}
              chat platform
            </>,
            <>
              Lot of other utility plugins for the{' '}
              <UnderlinedAnimationLink href="https://mattermost.com" target="_blank">
                Mattermost
              </UnderlinedAnimationLink>{' '}
              chat platform
            </>,
            'Worked on amazing tech stack: ReactJS, Golang and AWS',
          ],
        },
        {
          companyName: 'Tavisca',
          companyUrl: commonConstants.work.tavisca.url,
          totalDuration: <>{getTimeDifference(new Date('2019-07-15'), new Date('2020-01-25'))}</>,
          positions: [
            {
              title: 'Software Engineer',
              duration: (
                <>July 2019 - January 2020 · {getTimeDifference(new Date('2019-07-15'), new Date('2020-01-25'))}</>
              ),
            },
          ],
          responsibilities: [
            'Under went Software Engineering training for 6 months and learnt ' +
              'a lot about Software engineering design principles, clean code ' +
              'best practices, etc.',
            'Built a Road-trip Itinerary Planner (proof-of-concept) project ' +
              'where I applied all the things I learnt during my training phase',
            'Worked on fixing a bunch of bugs/issues on the production application',
          ],
        },
      ],
    },
  },
};
