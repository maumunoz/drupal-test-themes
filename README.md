drupal-test-themes
==================
This repository contains several themes used in [Acquia Site Factory](http://www.acquia.com/products-services/acquia-cloud-site-factory), a Drupal based sites builder/manager, to customize the different Miller sites.

## Developer Guidelines
Please follow these guidelines when adding commits to this repository in order to keep high maintainability, bug fixing and code trackability.

So far, there are 2 base themes (<code>Sab Miller Base</code> Themes) which inherit the rest of  themes and contain code that may affect almost every site, so be really careful when adding changes to these.

### How to commit
- Tortoise Git app is recommended to commit.
- Make the less commits as you can, one commit per task would be the best.
- Use the following syntax:
-  <pre><code> [Theme Name] - [Worked Module/Modules Names] - [Task description: May include Jira task description] </code></pre>
  -  Examples
  -   <pre><code> Base Theme v2 - Slick Carousel - Fix IE bugs </code></pre>
  -   <pre><code> Balboa Theme - Lista Promociones - Placeholder item styles </code></pre>
  -   <pre><code> Suprema Theme - Facebook Section - Styles </code></pre>
  - <code>Theme, Module,</code> or <code>Section</code> prefixes can be avoided from commit descriptions as shorthand.
- Try to keep local all changes/commits related to a module/task and push the changes when you make sure that your local changes are functional and stables.

