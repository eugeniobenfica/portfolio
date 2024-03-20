function randint(min, max) {
    return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min);
}

export class Particles {
    constructor(element, file = 'bparticle.json') {
        this.element = element;
        this.loadConfig(file);
    }

    async loadConfig(file) {
        try {
            const response = await fetch(file);
            const data = await response.json();
            this.config = data;
            this.setupParticles();
            this.animate();
            setInterval(() => this.animate(), this.config.duration);
        } catch (error) {
            console.error('Erro ao carregar o arquivo JSON:', error);
        }
    }

    setupParticles() {
        if (this.config.autoAmount) {
            this.config.amount = Math.floor((window.innerHeight * window.innerWidth) / 100 * 0.005);
        }

        for (let x = 0; x < this.config.amount; x++) {
            const particle = document.createElement("div");
            particle.classList.add('bparticles__particle');
            const size = randint(this.config.size[0], this.config.size[1]);
            particle.style.height = size + 'px';
            particle.style.width = size + 'px';
            const duration = this.config.duration;
            const timeFunction = this.config.timeFunction;
            particle.style.transition = `left ${duration}ms ${timeFunction}, top ${duration}ms ${timeFunction}, opacity ${duration}ms ${timeFunction}`;
            particle.style.left = `${randint(0, this.element.offsetWidth)}px`;
            particle.style.top = `${randint(0, this.element.offsetHeight)}px`;
            particle.dataset['x'] = parseInt(particle.style.left);
            particle.dataset['y'] = parseInt(particle.style.top);
            this.element.appendChild(particle);
        }
    }

    clear() {
        const particles = this.element.querySelectorAll('.bparticles__particle');
        particles.forEach(particle => {
            this.element.removeChild(particle);
        });
    }

    animate() {
        const particles = this.element.querySelectorAll('.bparticles__particle');
        particles.forEach(particle => {
            const mode = this.config.mode;
            if (mode === 'random') {
                particle.style.left = `${randint(0, this.element.offsetWidth)}px`;
                particle.style.top = `${randint(0, this.element.offsetHeight)}px`;
            } else if (mode === 'range') {
                particle.style.left = `${randint(particle.dataset['x'], parseInt(particle.dataset['x']) + this.config.floatX)}px`;
                particle.style.top = `${randint(particle.dataset['y'], parseInt(particle.dataset['y']) + this.config.floatY)}px`;
            }

            if (this.config.disappear) {
                const disappearChoice = randint(0, 1);
                particle.style.opacity = disappearChoice === 1 ? 0 : 1;
            }
        });
    }
}