/** 
 *  @fileOverview Generate React Component Scrollable Cards with 
 *                Indicator Sidebar
 *
 *  @author       Michael Czechowski <mail@dailysh.it>
 *
 *  @requires     NPM: react, prop-types, lodash, react-scrollspy
 */
import { kebabCase } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import Scrollspy from "react-scrollspy"

import "./index.scss"

class ScrollCards extends React.Component {

  cssVariablesMapping = {
    iconSize: `--nls-scroll-cards-icon-size`,
    bg:       `--nls-scroll-cards-bg`
  }

  componentDidMount() {
    this.applyCssVariables()
  }

  componentWillUnmount() {
    this.removeCssVariables()
  }

  /**
   * Renders react component
   */
  render() {
    const { 
      nodes, 
      indicatorClass,
      indicatorTitleClass,
      indicatorTitleActiveClass,
      indicatorSubTitleClass,
      itemClass, 
      itemContentClass, 
      itemTitleClass,
      hasIndicator,
      scrollOffset,
      wrapperClass,
    } = this.props

    return (
      <div className={wrapperClass}>
        {hasIndicator && <div className={indicatorClass}>
          <Scrollspy offset={scrollOffset} className="container" items={this.titles.map((title) => kebabCase(title))} currentClassName={indicatorTitleActiveClass}>
            {this.titles.map((title, i) => {
              const slug = kebabCase(title)
              const subTitles = this.subTitles(slug)

              return (
                <li className={indicatorTitleClass} key={i}>
                  <a href={`#${slug}`}>
                    {title}
                  </a>
                  {subTitles.length > 0 && <ul>
                    {subTitles.map(sub => {
                      return <li className={indicatorSubTitleClass}>{sub}</li>
                    })}
                  </ul>}
                </li>
              )
            })}
          </Scrollspy>
        </div>}
        <div>
          {nodes.map(({ frontmatter, headings, html }, i) => {
            const { title } = frontmatter

            return (
              <div className={itemClass} id={kebabCase(title)} key={i}>
                <div className="container">
                  <div className={itemContentClass} dangerouslySetInnerHTML={{ __html: html }} />
                  <div className={itemTitleClass}>
                    20.09.2019
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  /**
   * Applys all CSS Variables to the document so the stylesheet
   * can use certain variables required for the modal behaviour.
   */
  applyCssVariables() {
    const { cssVariables } = this.props

    Object.keys(this.cssVariablesMapping).forEach(key => {
      const value = cssVariables[key]
      const variable = this.cssVariablesMapping[key]

      return document.documentElement.style.setProperty(variable, value)
    })
  }
  /**
   * Removes all CSS variables in order not to spoil the DOM unnecessarily.
   */
  removeCssVariables() {
    Object.keys(this.cssVariablesMapping).forEach(key => {
      const variable = this.cssVariablesMapping[key]
      
      return document.documentElement.style.removeProperty(variable)
    }) 
  }
  /**
   * Extracts all subtitles of a specific depth of a specific
   * markdown node 
   * 
   * @param {string} slug
   * @param {number} depth 
   * @returns {string[]} List of all sub titles 
   */
  subTitles(slug, depth = 2) {
    const { nodes } = this.props

    const node = nodes.find(({ frontmatter }) => {
      const { title } = frontmatter
      return kebabCase(title) === slug
    })

    if (!node.hasOwnProperty('headings')) return []

    const { headings } = node

    if (headings.length === 0) return []

    return headings.filter(({ depth }) => {
      return depth === 2
    }).map(({ value }) => value)
  }
  /**
   * Extracts titles from markdown nodes.
   * 
   * @returns {string[]} List of all markdown node titles
   */
  get titles() {
    const { nodes } = this.props

    return nodes.map(({ frontmatter }) => frontmatter.title)
  }
}

ScrollCards.propTypes = {
  cssVariables: PropTypes.shape({
    bg: PropTypes.string,
    iconSize: PropTypes.string
  }),
  hasIndicator: PropTypes.bool,
  indicatorClass: PropTypes.string,
  indicatorTitleClass: PropTypes.string,
  indicatorTitleActiveClass: PropTypes.string,
  indicatorSubTitleClass: PropTypes.string,
  itemClass: PropTypes.string,
  itemContentClass: PropTypes.string,
  itemTitleClass: PropTypes.string,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          depth: PropTypes.number
        })
      ),
      html: PropTypes.string
    })
  ),
  scrollOfsett: PropTypes.number,
  wrapperClass: PropTypes.string,
}

ScrollCards.defaultProps = {
  cssVariables: {
    iconSize: `0.6rem`,
    bg: `255, 255, 255`
  },
  hasIndicator: true,
  indicatorClass: `nls-scroll-cards__indicator`,
  indicatorTitleClass: `nls-scroll-cards__indicator__title`,
  indicatorTitleActiveClass: `nls-scroll-cards__indicator__title--active`,
  indicatorSubTitleClass: `nls-scroll-cards__indicator__subtitle`,
  itemClass: `nls-scroll-cards__item`,
  itemContentClass: `nls-scroll-cards__item__content`,
  itemTitleClass: `nls-scroll-cards__item__title`,
  nodes: [
    {
      frontmatter: {
        title: `Nothing to see here ...`,
      },
      headings: [],
      html: `There was no content uploaded yet.`,
    }
  ],
  scrollOffset: -200,
  wrapperClass: `nls-scroll-cards`
}

export default ScrollCards