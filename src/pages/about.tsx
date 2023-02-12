import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { HeadMeta, Layout } from '~/components/Layout'
import { BackLink, PageContent } from '~/components/UI'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Slides: About</title>
        <HeadMeta />
      </Head>
      <AboutLayout>
        <BackLink href='/'>
          <ArrowLeftIcon style={{ height: 20, width: 20 }} />
          back to the editor
        </BackLink>
        <PageContent>
          <h1>About</h1>
          <h2>What is this?</h2>
          <p>A simple webapp that will display rendered content written in MDX on the screen.</p>
          <h2>What can I use it for?</h2>
          <p>This webapp is designed for course trainers.</p>
          <p>
            It renders a single slide with the MDX content from the editor.
            <br />
            Some use-cases are:
          </p>
          <ul>
            <li>creating the first slide before a presentation</li>
            <li>displaying a timer during a break</li>
            <li>displaying information about the current activity</li>
          </ul>
          <h2>Why MDX?</h2>
          <p>
            Markdown makes the process of writing rich text more efficient.{' '}
            <Link href='https://mdxjs.com/' target='_blank'>
              MDX
            </Link>{' '}
            takes it a step further by allowing the embedding of <strong>custom components</strong>.
          </p>
          <p>
            Check out the <Link href='/components'>components page</Link> for more details and
            examples.
          </p>
        </PageContent>
      </AboutLayout>
    </>
  )
}

const AboutLayout = styled(Layout)`
  padding: 32px;
  padding-top: 100px;
  padding-bottom: 64px;
  align-items: start;
`
