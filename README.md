# King's College London Engineering Society Website

Welcome to the code for the website! This hosts all the content for the KCL Engineering Society's website.

The website is built on [Liquid](https://shopify.github.io/liquid/) and vanilla CSS/JavaScript. Liquid is a templating language, which allows HTML to be programmatically generated. At build-time, all Liquid files get converted into plain HTML. This is extremely powerful on all scales, for things as simple as adding a header and footer to every page, to creating complex user interfaces.

## Running the Website

### Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager) at version 20 or higher
- A code editor
  - If you are maintaining this website with little or no prior coding experience, I recommend using [Visual Studio Code](https://code.visualstudio.com/)
  - Extensions that I advise installing include [Liquid](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Installation and Serving

This section of the README assumes that you have little or no prior experience, and are following my recommendation of using Visual Studio Code (VSCode from here on). If you know what you're doing, skip this section.

1. Clone the repository to your computer ([how do I clone a repository?](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))
2. Open the repository in VSCode.
3. Open a new terminal in VSCode, type in `npm install`, and hit enter (this is called running a command).
   - If the output says "`npm: command not found`", you need to [install Node.js](https://nodejs.org/en/download/package-manager)!
4. Run the command `npm run serve`.
5. Once the output has the line "`[11ty] Server at http://localhost:8080/`", open your browser, and go to `http://localhost:8080/`.

## Directory Structure

All files are listed under `/src`, to prevent any overlap with core files pertaining to the site's configuration.

### Important Files and Folders

- `package.json`: Contains dependencies [(what is a dependency?)](#dependencies) and metadata for the website project, as well as scripts that make building and serving the site easier for everyone
- `package-lock.json`: Metadata generated by `npm`, that helps version all the dependencies that the website is built on. **Do not delete this file.**
  - If you have a preference for using `yarn`, I urge you to use `npm` even though you prefer `yarn` (admittedly, it is mine). `yarn` is not pre-installed with NodeJS, and adds an additional step before someone unfamiliar with web development can get the site up and running.
- `node_modules/`: This is a folder with all the dependencies that are needed to build the project (eg. when you run `npm run serve`). The folder is included in `.gitignore`, so don't be confused when it doesn't show up on GitHub or your commits.
- `.eleventy.js`: The configuration for Eleventy, the generator that compiles our Liquid templates into regular HTML files
- `.vscode/`: Configuration file for this project's Visual Studio Code workspace, to unify everyone's editor configuration so we don't have mismatched formatting
  - `.prettierrc`: A configuration for the code formatter in the editor, to make sure code styling is consistent
- `.htaccess`: Redirects all 404 errors to the `/src/404.html` file
- `.gitignore`: A list of files to exclude from Git when committing. Don't modify it without good reason, and **do not delete this file.**

### Source Files

- `src/_includes/`: Reusable components that are included in multiple pages throughout the website, such as headers and footers
- `src/_layouts/`: Layout templates that allow different pages in the same collection to have a uniform look
  - `src/_layouts/default.liquid`: Most pages (unless otherwise specified) derive their template from here. Also contains the `<head>` section for website metadata (things that only your browser/computer care about).
- `src/static/`: Hosts all the static (as the name implies) files of the website. These files typically include CSS, images, and JavaScript, but extend to other assets like fonts. If you're curious about the naming and reasoning, check out [this StackOverflow answer](https://stackoverflow.com/a/63627581).

## FAQ

<details>
<summary>How do I test the website?</summary>

Open a terminal, navigate to the project, and type in `npm run serve`. Once the terminal outputs the line "`[11ty] Server at http://localhost:8080/`", open your browser, and go to `http://localhost:8080/`.
</details>

<details>
<summary>I've made a change. How do I deploy the website?</summary>

> TBC depending on where we host the website

</details>

<details>
<summary id="dependencies">What is a dependency?</summary>

A dependency, is as the name suggests, something that your code depends on in order to run. In the context of this website, one dependency would be the static site generator, Eleventy, that compiles all our Markdown and Liquid files into HTML. Often, dependencies are referred to as "libraries".

Dependencies come in many forms. For example, [NumPy](https://numpy.org/) is a very popular library for the Python programming language, which has support for N-dimensional arrays, making complex mathematical operations possible. While you could code and implement N-dimensional arrays yourself, it's often easier to use code that other people have written and tested, to greatly speed up your programming. In other words, dependencies allow us to avoid reinventing the wheel.

</details>

<details>
<summary>Why did you use Eleventy and Liquid? Why not use X framework?</summary>

> TL;DR: Eleventy is simple, Liquid is portable, CSS frameworks are too opinionated and obfuscate HTML for beginners.

### On Eleventy

Creating a website without any kind of prerequisite knowledge is hard enough. Eleventy, in my opinion, is simple enough that you quickly pick it up, provided you learn some JavaScript, and use it with the documentation open. But most importantly, it's unobtrusive. There are definitely more powerful and/or structured static site generators out there, such as Jekyll or Hugo. However, they require more cognitive load to install, configure, and learn if you have no dev background. We're engineers, not web developers!

As for JavaScript frameworks like React or Vue, they're nice frameworks, but completely overkill for a static site with near-zero user interactivity. There is no need to ship 2MB of JavaScript client-side just to render a landing page! And if you need functionality, write it in vanilla JavaScript.

### On Liquid

Liquid is a templating language that was created by Shopify, and has been widely used enough that documentation and StackOverflow pages for it are readily available. It seems contradictory to have Liquid in this project, especially after I have talked about reducing the cognitive load needed to pick up development on this site. And I will admit, it is to an extent. But Liquid provides portability for this project- should Eleventy suddenly disappear, or we wish to move to another platform, Liquid is widely available to plug and play. In addition, it adds only a little syntactical overhead to HTML, making it easy to read and pick up for a beginner.

### On CSS

CSS frameworks are absolutely fantastic, but not when you are starting from scratch with next to no knowledge on web development. I had thought of using utility-class based frameworks like Tailwind or Tachyons. Yet, no matter how simple they are, I have three qualms with them for this project:

1. They have a steep learning curve for a CSS beginner,

1. They are far too opinionated on how the website should be styled, and,

1. They pollute too much of the HTML.

(1) is self-explanatory. (2) means that the frameworks are too rigid in how they want you to style your website, which is a double-edged sword. For a large project, you want the structure and rigour, but for something small like this website, it's fine to have one CSS file. (3) is the most important, as it concerns the longevity of this website's maintenance. If someone is learning HTML/CSS from fundamentals as they work on the website, utility classes littering the HTML will be far too confusing, and thus, counterproductive to their learning.

</details>
