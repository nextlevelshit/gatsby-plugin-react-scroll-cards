/** 
 *  @fileOverview Generate React Component Scrollable Cards.
 *
 *  @author       Michael Czechowski <mail@dailysh.it>
 *
 *  @requires     NPM: react, prop-types
 */
import React from "react"
import PropTypes from "prop-types"

import "./index.scss"

class ScrollCards extends React.Component {

  progress = 0

  constructor(props) {
    super(props)

    this.wrapper = React.createRef()
  }

  componentDidMount() {
    // this.props.cssVariables = [
    //   {
    //     key: '--nls-scroll-cards-count',
    //     val: this.titles.length
    //   },
    //   ...this.props.cssVariables
    // ]
    this.applyCssVariables()
    this.trackScrollProgress()
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
      itemClass, 
      itemContentClass, 
      itemTitleClass,
      wrapperClass,
    } = this.props

    return (
      <div className={wrapperClass} ref={this.wrapper}>
        <div className={indicatorClass}>
          <div className="container">
            {this.titles.map((title, i) => {
              return (
                <div className={indicatorTitleClass} key={i}>
                  {title}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          {nodes.map(({ frontmatter, html }, i) => {
            return (
              <div className={itemClass} key={i}>
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
   * can use certain variables required for the component behaviour.
   * 
   * @returns {void}
   */
  applyCssVariables() {
    const { cssVariables } = this.props

    requestAnimationFrame(() => {
      document.documentElement.style.setProperty(cssVariables.count.key, this.titles.length)
      document.documentElement.style.setProperty(cssVariables.progress.key, `${this.progress}%`)
    })
  }
  /**
   * Removes all CSS variables in order not to spoil the DOM unnecessarily.
   * 
   * @returns {void}
   */
  removeCssVariables() {
    const { cssVariables } = this.props

    Object.keys(cssVariables).forEach(css => {
      document.documentElement.style.removeProperty(css.key)
    })
  }
  /**
   * Adds a event listener for the scroll progress and adjusts variables 
   * for the react component to work properly.
   * 
   * @return {void}
   */
  trackScrollProgress() {
    document.addEventListener('scroll', () => {
      this.calculateScrollDistance()
    })
  }
  /**
   * 
   */
  calculateScrollDistance() {
    const { pageYOffset } = window
    const { offsetTop } = this.wrapper.current
    const correctedPageYOffset = pageYOffset - offsetTop

    if (correctedPageYOffset > 0 && correctedPageYOffset <= this.wrapperHeight) {
      this.progress = Math.floor(correctedPageYOffset / this.wrapperHeight * 100)
    } else {
      this.progress = 0
    }
    this.applyCssVariables()
  }
  calculateHeight(index) {
    // calc(calc(100% - var(--nls-scroll-cards-progress)) / var(--nls-scroll-cards-count));

    console.log((100 - this.progress) / this.titles.length)

    return (100 - this.progress) / this.titles.length
  }
  /**
   * Calculates from `scrollHeight`, `offsetHeight` and `clientHeight`
   * the maximum document body height and returns it.
   * 
   * @return {number} Document body height
   */
  get wrapperHeight() {
    return Math.max(
      this.wrapper.current.scrollHeight,
      this.wrapper.current.offsetHeight,
      this.wrapper.current.clientHeight
    )
  }
  /**
   * Calculates from `scrollHeight`, `offsetHeight` and `clientHeight`
   * the maximum wrapper height and returns it.
   * 
   * @return {number} Wrapper height
   */
  get documentHeight() {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
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
  wrapperClass: PropTypes.string,
  cssVariables: PropTypes.shape({
    count: PropTypes.shape({
      key: PropTypes.string,
      val: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    progress: PropTypes.shape({
      key: PropTypes.string,
      val: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  })
}

ScrollCards.defaultProps = {
  cssVariables: {
    count: {
      key: '--nls-scroll-cards-count',
      val: 1,
    },
    progress: {
      key: '--nls-scroll-cards-progress',
      val: `0%`
    }
  },
  hasIndicator: true,
  indicatorClass: `nls-scroll-cards__indicator`,
  indicatorTitleClass: `nls-scroll-cards__indicator__title`,
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
  wrapperClass: `nls-scroll-cards`
}

export default ScrollCards