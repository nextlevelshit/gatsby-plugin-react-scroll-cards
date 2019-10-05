/** 
 *  @fileOverview Generate React Component Scrollable Cards.
 *
 *  @author       Michael Czechowski <mail@dailysh.it>
 *
 *  @requires     NPM: react, prop-types
 */
import { kebabCase } from "lodash"
import React from "react"
import PropTypes from "prop-types"
import Scrollspy from "react-scrollspy"

import "./index.scss"

class ScrollCards extends React.Component {
  /**
   * Renders react component
   */
  render() {
    const { 
      nodes, 
      indicatorClass,
      indicatorTitleClass,
      indicatorTitleActiveClass,
      itemClass, 
      itemContentClass, 
      itemTitleClass,
      scrollOffset,
      wrapperClass,
    } = this.props

    return (
      <div className={wrapperClass}>
        <div className={indicatorClass}>
          <Scrollspy offset={scrollOffset} className="container" items={this.titles.map((title) => kebabCase(title))} currentClassName={indicatorTitleActiveClass}>
            {this.titles.map((title, i) => {
              return (
                <li className={indicatorTitleClass} key={i}>
                  <a href={`#${kebabCase(title)}`}>
                    {title}
                  </a>
                </li>
              )
            })}
          </Scrollspy>
        </div>
        <div>
          {nodes.map(({ frontmatter, html }, i) => {
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
  hasIndicator: PropTypes.bool,
  indicatorClass: PropTypes.string,
  indicatorTitleClass: PropTypes.string,
  indicatorTitleActiveClass: PropTypes.string,
  itemClass: PropTypes.string,
  itemContentClass: PropTypes.string,
  itemTitleClass: PropTypes.string,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      html: PropTypes.string
    })
  ),
  scrollOfsett: PropTypes.number,
  wrapperClass: PropTypes.string,
}

ScrollCards.defaultProps = {
  hasIndicator: true,
  indicatorClass: `nls-scroll-cards__indicator`,
  indicatorTitleClass: `nls-scroll-cards__indicator__title`,
  indicatorTitleActiveClass: `nls-scroll-cards__indicator__title--active`,
  itemClass: `nls-scroll-cards__item`,
  itemContentClass: `nls-scroll-cards__item__content`,
  itemTitleClass: `nls-scroll-cards__item__title`,
  nodes: [
    {
      frontmatter: {
        title: `Nothing to see here ...`,
      },
      html: `There was no content uploaded yet.`,
    }
  ],
  scrollOffset: -200,
  wrapperClass: `nls-scroll-cards`
}

export default ScrollCards