<a name="readme-top"></a>

<div align="center">
    <h1>Kanban Tasker</h1>
    <p style="text-align:justify;">
        A user-friendly, agile <strong>Kanban Tasker</strong> web application created using Client-Server structure featuring adaptable theming and a drag-and-drop interface. The backend is set up on AWS while the frontend is hosted on Vercel using Github Actions for CI/CD. Security is managed through HTTPS/SSL on AWS Application Load Balancer.
    </p>
    <p>
        <a href="https://kanban-task-management-web-app-one.vercel.app">Live Site URL</a>
    </p>
</div>

![Index](./docs/screenshot/iMacAndPixel4xl.webp)

<p align="center"><a href="https://github.com/Aayan107">Aayan</a></p>


## Table of contents

* [Features](#features)
* [Screenshot](#screenshot)
* [Built with](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Acknowledgments](#acknowledgments)
* [Author](#author)


## Features

* View the optimal layout for the app depending on their device's screen size
* See hover states for all interactive elements on the page
* Create, read, update, and delete boards and tasks
* Receive form validations when trying to create/edit boards and tasks
* Mark subtasks as complete and move tasks between columns
* Hide/show the board sidebar
* Toggle the theme between light/dark modes
* Allow users to drag and drop
  *  boards icon to re-order them in the Sidebar
  *  columns to re-order them in a board
  *  tasks to change their status and re-order them in a column
  *  subtasks to re-order them in the task detail modal
* Keep track of any changes, even after refreshing the browser (use `localStorage`)
* When creating/editing boards and tasks, show confirmation dialog before leaving the page

<p align="right"><a href="#readme-top">⬆︎ BACK TO TOP</a></p>


## Screenshot

<table>
    <tr>
        <td>
            <p>Index - Light Mode</p>
            <img src="./docs/screenshot/index-light-rwd.png" alt="Index - Light Mode">
        </td>
        <td>
            <p>Index - Dark Mode</p>
            <img src="./docs/screenshot/index-dark-rwd.png" alt="Index - Dark Mode">
        </td>
    </tr>
    <tr>
        <td>
            <p>Edit Board</p>
            <img src="./docs/screenshot/edit-board.png" alt="Edit Board">
        </td>
        <td>
            <p>Task Detail</p>
            <img src="./docs/screenshot/task-detail.png" alt="Task Detail">
        </td>
    </tr>
    <tr>
        <td>
            <p>Edit Task</p>
            <img src="./docs/screenshot/edit-task.png" alt="Edit Task">
        </td>
    </tr>
</table>


<details>
  <summary>GIF</summary>
  <table>
    <tr>
        <td>
            <p>Index</p>
            <img src="./docs/screenshot/index.gif" alt="Index">
        </td>
        <td>
            <p>Task</p>
            <img src="./docs/screenshot/task.gif" alt="Task">
        </td>
    </tr>
    <tr>
        <td>
            <p>Form Validation</p>
            <img src="./docs/screenshot/validation.gif" alt="Form Validation">
        </td>
        <td>
            <p>Leave Alert</p>
            <img src="./docs/screenshot/alert.gif" alt="Leave Alert">
        </td>
    </tr>
    <tr>
        <td>
            <p>Theme Switcher</p>
            <img src="./docs/screenshot/theme.gif" alt="Theme">
        </td>
        <td>
        </td>
    </tr>
  </table>
</details>


<p align="right"><a href="#readme-top">⬆︎ BACK TO TOP</a></p>


## Built with

* [Vue 3](https://vuejs.org): JavaScript Framework
* [Vue Router 4](https://router.vuejs.org): Official router for Vue
* [Pinia 2](https://pinia.vuejs.org): Store library for Vue
* [Nuxt 3](https://nuxt.com): Vue Framework
* [SCSS](https://sass-lang.com): CSS extension language
* [VueUse](https://vueuse.org): Collection of Vue Composition Utilities
* [VueDraggablePlus](https://alfred-skyblue.github.io/vue-draggable-plus): Drag and drop components
* [nuxt-svgo](https://github.com/cpsoinos/nuxt-svgo): Nuxt module to load optimized SVG files as Vue components
* [Nuxt Google Fonts](https://google-fonts.nuxtjs.org/): Google Fonts module for Nuxt
* [@antfu/eslint-config](https://github.com/antfu/eslint-config): Code style

<p align="right"><a href="#readme-top">⬆︎ BACK TO TOP</a></p>


## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites
* [Node.js](https://nodejs.org) version 18.0.0 or newer

### Installation
1. Clone the repo
    ```sh
    git clone https://github.com/Aayan107/Kanban-Tasker.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Compile and Hot-Reload for Development
    ```sh
    npm run dev
    ```

<p align="right"><a href="#readme-top">⬆︎ BACK TO TOP</a></p>


## Acknowledgments

* Theme Switcher
    * [**實作網頁深色模式及淺色模式的切換** by Mark](https://blog.tarswork.com/post/implement-dark-mode-and-light-mode-for-web-pages)
    * [**Dark Theme Switcher in Vue.js** by yestellar](https://github.com/yestellar/vue_theme_switcher#dark-theme-switcher-in-vuejs)

<p align="right"><a href="#readme-top">⬆︎ BACK TO TOP</a></p>


## Author

* GitHub - [Aayan](https://github.com/Aayan107)
* LinkedIn - [@Aayan107](https://www.linkedin.com/in/aayan107/)

<p align="right"><a href="#readme-top">⬆︎ BACK TO TOP</a></p>
