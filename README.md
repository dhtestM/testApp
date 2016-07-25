## Welcome Component Developer

This is a comprehensive starter kit for a **standalone Origami v2 component**. You should integrate your standalone Origami v2 component into a larger application capable of managing data flow of all available components.

In order to utilize this successfully, you **must** have solid working knowledge of Facebook's React - a library for
building composable user interfaces. It wouldn't hurt to understand ES2015 (ES6) syntax and concepts either.

This starter kit implements best practices like testing, linting, bundling, transpiling ES6 to ES5, etc. It codifies a
long list of decisions that you no longer have to make to get rolling. It saves you from the long, painful process of
wiring it all together into an automated development environment and build process.

## Public or Private?

Your first decision: Are you building a public (OSS) or private (internal only) component? By default, Origami
components are public unless it was decided otherwise in consultation with the Pearson Design Accelerator team.

If you are building open source, the repo belongs in the Pearson GitHub organization. Send a request to be invited with
your GitHub username to pearson-design-accelerator@pearson.com. You must accept the resulting email invitation to join.

Otherwise, the repo belongs in Pearson BitBucket, for which you should already have access.

## Getting Started

1. Create your new repository in github.com/Pearson-Higher-Ed or bitbucket.pearson.com/projects/ORC.

2. Follow these [directions](https://help.github.com/articles/caching-your-github-password-in-git/#platform-all) to stop
 manually authenticating to GitHub on every network request. This enables the use of automated npm scripts.

3. Perform these steps in your development environment:  
	1. git clone https://github.com/Pearson-Higher-Ed/component-archetype.git **[name_of_your_new_component]**  
	2. cd **[name_of_your_new_component]**  
    3. git remote set-url origin **[url_of_new_component_repository]**  
    4. git remote -v  

4. Once you've verified that the remote origin now looks correct for your repo, do the initial push:

    git push -u origin master

## Ready to Develop

After completing the above steps, delete this README and rename [README.main.md](README.main.md) as "README.md" for
your project. You are ready to begin developing your component!
