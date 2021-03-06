import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
// import CMS from 'netlify-cms-app'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Guides from '../components/Guides'
import Projects from '../components/Projects'
import SEO from '../components/SEO'
import Blurb from '../components/Blurb'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import projects from '../data/projects'
import interviews from '../data/interviews'
import speaking from '../data/speaking'

// Initialize the CMS object
// CMS.init()

export default function BlogIndex({ data }) {
  const latest = data.latest.edges
  const popular = data.popular.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])

  const Section = ({ title, children, button, ...props }) => (
    <section {...props}>
      <h2>
        {title}
        {button && (
          <Link className="section-button" to="/blog">
            View all
          </Link>
        )}
      </h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      {/* <Blurb title="Hey! I'm Tania Rascia.">
        <p>
          I'm a software engineer, writer, and open-source creator. This website
          is my digital garden &mdash; a compendium of the things I've learned
          and created over the years.
        </p>
        <p className="stack-mobile">
          <Link className="button" to="/me">
            About me
          </Link>
          <a
            className="button"
            href="https://taniarascia.substack.com"
            target="_blank"
            rel="noreferrer"
          >
            Join newsletter
          </a>
          <a
            className="button"
            href="https://github.com/taniarascia"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </Blurb> */}
      <Blurb>
        <section className="small lead">
          <h1>Hey, I'm Saugaat</h1>
          <p className="subtitle">
            I'm a software engineer, technical writer, and{' '}
            <a
              href="https://github.com/taniarascia"
              target="_blank"
              rel="noreferrer"
            >
              open source
          </a>{' '}
          creator. This website is a compendium of the things I have learned
          over the years, and also my "digital garden".
        </p>
          <p>
            I aim to create a beautiful corner of the web free of ads, sponsored
            posts, newsletter pop-ups, affiliate links, and the rest of the
            annoying noise we're so accustomed to seeing on the internet these
            days.
        </p>
          <p>
            You can <Link to="/blog">read my posts</Link>,{' '}
            <Link to="/blog">view my development guides</Link>, or contact me at{' '}
            <b>hello</b> at <b>taniarasica.com</b>.
        </p>
        </section>
      </Blurb>
      <div className="container index">
        <Section title="Latest Articles" button>
          <Posts data={simplifiedLatest} />
        </Section>
        <Section title="Popular Articles" button>
          <Posts data={simplifiedPopular} />
        </Section>
        <Section title="Projects">
          <Projects data={projects} />
        </Section>
        <Section title="Interviews">
          <Guides data={interviews} frontPage />
        </Section>
        <Section title="Speaking">
          <Guides data={speaking} frontPage />
        </Section>
        <Section title="Newsletter">
          <p>I send out an email when I create something new.</p>
          <a
            href="https://taniarascia.substack.com/subscribe"
            target="_blank"
            rel="noreferrer"
            className="button large"
          >
            <span className="emoji">💌</span> Join the Newsletter
          </a>
        </Section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
