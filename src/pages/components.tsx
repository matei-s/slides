import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Head from 'next/head'
import styled from 'styled-components'
import { HeadMeta, Layout } from '~/components/Layout'
import { BackLink, PageContent } from '~/components/UI'

export default function ComponentsPage() {
  return (
    <>
      <Head>
        <title>Components</title>
        <HeadMeta />
      </Head>
      <ComponentsLayout>
        <BackLink href='/'>
          <ArrowLeftIcon style={{ height: 20, width: 20 }} />
          back to the editor
        </BackLink>
        <PageContent>
          <h1>Custom Components</h1>
          <p>
            <strong>Note:</strong> The project in development, new compoents will be added soon.
          </p>
          <h2>Timer</h2>
          <p>
            The <code>Timer</code> component will add a live countdown at the top-right corner.
          </p>
          <p>Attributes:</p>
          <ul>
            <li>
              <code>until</code> - <strong>string</strong> of that specifies the stopping time for
              the countdown timer. The format needs to be <code>HH:MM</code>.
            </li>
          </ul>

          <p>Example:</p>
          <pre>
            <code>
              {`# Timer Example

<Timer until='14:50' />`}
            </code>
          </pre>
        </PageContent>
      </ComponentsLayout>
    </>
  )
}

const ComponentsLayout = styled(Layout)`
  padding: 32px;
  padding-top: 100px;
  padding-bottom: 64px;
`
