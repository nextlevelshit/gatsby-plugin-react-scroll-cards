<div align="center">
  <h1>gatsby-plugin-react-image-map</h1>
  <sup>GatsbyJS Plugin · React</sup>
</div>

<br><br>

This GatsbyJS plugin is creating a multi-layered react component with changing background images on mouse or touch moves.
The images are in full width and cover the whole wrapper element.
It's showen one image at a time. 
While moving the mouse in any direction the images are beeing iterated and exchanged.
On touch devices only the x-axis is beeing tracked for iterating the images.

<!-- Open example of [`gatsby-plugin-image-map`](https://paulastoll.de) -->

## Dependencies

To use this plugin correctly you should have installed `gatsby-transformer-sharp`.

1. Install `gatsby-transformer-sharp`
   ```shell
   yarn add gatsby-transformer-sharp
   # or
   npm install --save gatsby-transformer-sharp
   ```

2. Configure `gatsby-config.js`
   ```javascript
   module.exports = {
     plugins: [
       `gatsby-transformer-sharp`,
       // ...
     ]
     // ...
   }
   ```

<!-- ## Learning Resources (optional)

If there are other tutorials, docs, and learning resources that are necessary or helpful to someone using this plugin, please link to those here. -->

## Install

1. Install `gatsby-plugin-image-map`
   ```shell
   yarn add gatsby-plugin-react-image-map
   # or
   npm i --save-dev gatsby-plugin-react-image-map
   ```

2. Configure `gatsby-config.js`
   ```javascript
   module.exports = {
     plugins: [
       `gatsby-transformer-sharp`, // dependency that should be installed aswell
       `gatsby-plugin-react-image-map`,
       // ...
     ],
     // ...
   }
   ```

## Available options

These are the default options and can/should be modified.
`nodes` is the only required property.
All the rest is optional.

```javascript
activeClass: ``,          // (optional) class of an active image wrapper
activeStyle: {            // (optional) active styles for active image wrapper
  opacity: 1,
},
imageStyle: {             // (optional) custom styles for image element
  maxWidth: `100%`,
  maxHeight: `100vh`,
},
itemClass: ``,            // (optional) class of an active image wrapper
itemStyle: {              // (optional) custom styles for image wrapper
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
nodes: [],                // list of your images
threshold: 100            // (optional) the bigger the threshold, the longer
                          // the mouse movement has to be to change an image
```

## When do I use this plugin?

This plugin is perfect to have an interactive first impression of your website.
The images are in the background so you can easily put content in front of them.
It is a kind of interactice slide show.

## Examples of usage

```javascript
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ImageMap from "gatsby-plugin-react-image-map" // import the image-map plugin

const ImageMapContainer = () => {
  /**
   * Query the images you'd like to be visible inside the image map.
   * In this case the regular expression is looking for images inside
   * the `image-map` folder inside your `src`
   */
  const data = useStaticQuery(graphql`
    query ImageMapQuery {
      allFile(filter: {relativePath: {regex: "/image-map/"}}) {
        nodes {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
          relativePath
        }
      }
    }
  `)
   
  return (
    <ImageMap nodes={data.allFile.nodes}/>
  )
}

export default ImageMapContainer
```

## Examples

- [Paula Stoll · Documentary Director](https://paulastoll.de)
- [Guenter Krauss](https://gk.dailysh.it)

<!-- ## How to run tests

## How to develop locally

## How to contribute

If you have unanswered questions, would like help with enhancing or debugging the plugin, it is nice to include instructions for people who want to contribute to your plugin. -->