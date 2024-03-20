import { Particles } from "./bparticles.js";
import { translate } from "./translator.js";

let changeThemeButton = document.getElementById('change-theme')
changeThemeButton.addEventListener('click', () => {
    let colorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
    let colorSecundary = getComputedStyle(document.documentElement).getPropertyValue('--color-secundary');
    let colorAlphaPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-alpha-primary');
    let colorAlphaSecundary = getComputedStyle(document.documentElement).getPropertyValue('--color-alpha-secundary');
    document.documentElement.style.setProperty('--color-primary', colorSecundary);
    document.documentElement.style.setProperty('--color-secundary', colorPrimary);
    document.documentElement.style.setProperty('--color-alpha-primary', colorAlphaSecundary);
    document.documentElement.style.setProperty('--color-alpha-secundary', colorAlphaPrimary);
})

let mainTitle = document.getElementById('main__title')
let mainDescription = document.getElementById('main__description')
let showcaseTitle = document.getElementById('showcase__title')

mainTitle.textContent = translate(mainTitle)
mainDescription.textContent = translate(mainDescription)
showcaseTitle.textContent = translate(showcaseTitle)

let bg = document.querySelector('#particles')
new Particles(bg, './bparticles.json')

let showcaseProjects = document.getElementById('showcase__projects')
fetch('./projects.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(project => {
            let a = document.createElement('a')
            a.classList.add('showcase__projects__project')
            a.href = project.href
            let title = document.createElement('h3')
            title.textContent = project.name
            let lang = document.createElement('span')
            lang.textContent = project.lang
            let description = document.createElement('p')
            description.textContent = project.description
            a.appendChild(title) 
            a.appendChild(lang) 
            a.appendChild(description)
            showcaseProjects.appendChild(a)
        });
    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
    });