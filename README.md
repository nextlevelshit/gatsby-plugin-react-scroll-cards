<div align="center">
  <h1>gatsby-plugin-react-scroll-cards</h1>
  <sup>GatsbyJS Plugin · React · TailwindCSS · lodash · React Scrollspy</sup>
</div>

<br><br>

This GatsbyJS plugin is generating a full-height scroll menu with abstracts of each card. Cards can be clicked and opened in a separate modal.

## Dependencies

To use this plugin correctly you should have installed [`gatsby-plugin-sass`](https://www.gatsbyjs.org/packages/gatsby-plugin-sass/), `tailwindcss`, `lodash` and `react-scrollspy`.

1. Install `gatsby-plugin-sass`, `tailwindcss`, `lodash` and `react-scrollspy`
   ```shell
   yarn add gatsby-plugin-sass tailwindcss lodash react-scrollspy
   # or
   npm install --save gatsby-plugin-sass tailwindcss lodash react-scrollspy
   ```

1. Configure `gatsby-config.js`
   ```javascript
   module.exports = {
     plugins: [
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          postCssPlugins: [
            require('tailwindcss'),
            // require('./tailwind.config.js'), // Optionally add your personal tailwind config
          ]
        },
      },
       // ...
     ]
     // ...
   }
   ```

<!-- ## Learning Resources (optional)

If there are other tutorials, docs, and learning resources that are necessary or helpful to someone using this plugin, please link to those here. -->

## Install

1. Install `gatsby-plugin-react-scroll-cards`
   ```shell
   yarn add gatsby-plugin-react-scroll-cards
   # or
   npm i --save-dev gatsby-plugin-react-scroll-cards
   ```

2. Configure `gatsby-config.js`
   ```javascript
   module.exports = {
     plugins: [
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          postCssPlugins: [
            require('tailwindcss'),
            // require('./tailwind.config.js'), // Optionally add your personal tailwind config
          ]
        },
      },
      `gatsby-plugin-react-scroll-cards`,
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
cssVariables: {
  iconSize: `0.6rem`,
  bg: `255, 255, 255`
},
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
```

## When do I use this plugin?

...


## Examples of usage

...


## Examples

...

<!-- ## How to run tests

## How to develop locally

## How to contribute

If you have unanswered questions, would like help with enhancing or debugging the plugin, it is nice to include instructions for people who want to contribute to your plugin. -->