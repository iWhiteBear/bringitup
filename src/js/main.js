import MainSlider from './modules/slider/slider-main';
import VideoPlaer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.page', page:'.next'});
    slider.render();

    const player = new VideoPlaer('.showup .play', '.overlay');
    player.init();
}); 