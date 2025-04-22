import ScrollReveal from 'scrollreveal';

export default function revealElements(configs: {
    selector: string;
    origin?: 'top' | 'bottom' | 'left' | 'right';
    duration?: number;
    distance?: string;
}) {
    const {
        selector,
        origin = 'bottom',
        duration = 2000,
        distance = '10%',
    } = configs;

    ScrollReveal().reveal(selector, {
        origin,
        duration,
        distance,
        reset: false,
        easing: 'ease-in-out',
        opacity: 0,
    });
}