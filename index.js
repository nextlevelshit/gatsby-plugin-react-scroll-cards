/** 
 *  @fileOverview Generate React Component for Image Map. This component
 *                takes an array of `childImageSharp` elements and renders
 *                them on separate layers inside a container. As soon as
 *                the user starts moving the mouse or swipes the screen,
 *                the images inside the container are exchanged.
 *
 *  @author       Michael Czechowski <mail@dailysh.it>
 *
 *  @requires     NPM: react, prop-types, gatsby-image
 */
import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

class ImageMap extends React.Component {

  currentPosition = {
    x: -1,
    y: -1
  }

  constructor(props) {
    super(props)

    this.state = { 
      active: Math.floor(Math.random() * props.nodes.length)
    }
  }

  /**
   * Calculates the distance between the current/last position
   * of the mouse and a new point on the client screen.
   *
   * @param   {number} clientX      the x-axis coordinate
   * @param   {number} [clientY=0]  the y-axis coordinate
   *
   * @returns {number} delta between clientX and clientY
   */
  calculateDelta(clientX, clientY = 0) {   
    const { x , y } = this.currentPosition

    return Math.hypot((clientX - x), (clientY - y))
  }
  /**
   * Event handler for mouse movement. While tracking the current/last
   * mouse position the distance to that point is calculated each mouse
   * move, so as soons as the threshold is reached a new image will be
   * set as active and the `currentPosition` will be updated.
   *
   * @param   {number} clientX      the x-axis coordinate
   * @param   {number} [clientY=0]  the y-axis coordinate
   *
   * @returns {number} delta between clientX and clientY
   */
  mouseMoved(e) {
    const { clientX, clientY } = e 
    const { threshold, nodes } = this.props
    const { active } = this.state
    const delta = this.calculateDelta(clientX, clientY)

    /**
     * If the threshold is reached, update the `currentPosition`
     * and iterate to next image in `nodes`
     */
    if(delta > threshold) {
      this.currentPosition = {
        x: clientX,
        y: clientY
      }

      this.setState({
        active: (active + 1) % nodes.length
      })
    }
  }

  touchMoved(e) {
    const { touches } = e 
    const { clientX } = touches[0]
    const { threshold, nodes } = this.props
    const { active } = this.state
    const delta = this.calculateDelta(clientX)

    /**
     * If the threshold is reached, update the `currentPosition`
     * and iterate to next image in `nodes`.
     */
    if(delta > threshold) {
      this.currentPosition = {
        x: clientX,
        y: 0
      }

      this.setState({
        active: (active + 1) % nodes.length
      })
    }
  }
  /**
   * Render react component
   */
  render() {
    const { nodes, activeClass, imageStyle } = this.props
    const { active } = this.state

    return (
      <div onMouseMove={this.mouseMoved.bind(this)} onTouchMove={this.touchMoved.bind(this)}>
        {nodes.length > 0 && nodes.map(({ childImageSharp }, i) => {
          const { fluid } = childImageSharp
          let { itemClass, itemStyle, activeStyle } = this.props

          /**
           * If the index matches `active`, concatinate the classes
           * and styles of the image and image wrapper element.
           */
          if (i === active) {
            itemClass = ([activeClass, itemClass]).join(` `)
            itemStyle = {
              ...itemStyle,
              ...activeStyle
            }
          }
          
          return (
            <div className={itemClass} style={itemStyle} key={i}>
              <Img fluid={fluid} style={imageStyle} />
            </div>
          )
        })}
      </div>
    )
  }
}

ImageMap.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired
      })
    })
  ),
  activeClass: PropTypes.string,
  activeStyle: PropTypes.object,
  itemClass: PropTypes.string,
  itemStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  threshold: PropTypes.number,
}

ImageMap.defaultProps = {
  activeClass: ``,
  activeStyle: {
    opacity: 1,
  },
  imageStyle: {
    maxWidth: `100%`,
    maxHeight: `100vh`,
  },
  itemClass: ``,
  itemStyle: {
    position: `absolute`,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: `block`,
    opacity: 0,
    width: `100%`,
    height: `100%`,
  },
  nodes: [],
  threshold: 100
}

export default ImageMap