const translations = {
    'pt-BR': {
        'main__title': 'Bem vindo.',
        'main__description': 'Olá, sou Eugênio Benfica, um estudante apaixonado por matemática, física, ciências, tecnologia e programação. Ao longo dos anos, tenho me dedicado a explorar e aprimorar minhas habilidades nessas áreas, resultando em uma variedade de projetos interessantes que gostaria de compartilhar com vocês hoje.',
        "showcase__title": "Projetos"
    }
}

export function translate(element) {
    let language = navigator.language || navigator.userLanguage;
    let from = element.id
    return translations[language][from]
}