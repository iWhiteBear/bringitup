import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }
    
    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }
    nextSlide() {
       
        // Move the first slide to the end
        this.container.appendChild(this.slides[0]);
    
        // Update the slides array to reflect the new order
        this.slides = Array.from(this.container.children);
       
        // Handle buttons if they exist
        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].tagName === "BUTTON") {
                this.container.appendChild(this.slides[i]);
                // Update the slides array again as the order has changed
                this.slides = Array.from(this.container.children);
            }
        }
    
        this.decorizeSlides();
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
        
                    // Find the current first slide in the DOM
                    let firstSlideInDOM = this.container.children[0];
        
                    // Insert the active slide before the first slide in the DOM
                    this.container.insertBefore(active, firstSlideInDOM);
        
                    // Update the slides array to reflect the new order
                    this.slides = Array.from(this.container.children);

                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    activateAnimation() {
        this.paused = setInterval(() => this.nextSlide(), 5000);
    }

    init() {
        try{
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {
                this.container.addEventListener('mouseenter', () => clearInterval(this.paused));
                this.next.addEventListener('mouseenter', () => clearInterval(this.paused));
                this.prev.addEventListener('mouseenter', () => clearInterval(this.paused));
                this.container.addEventListener('mouseleave', () => this.activateAnimation());
                this.next.addEventListener('mouseleave', () => this.activateAnimation());
                this.prev.addEventListener('mouseleave', () => this.activateAnimation());
                this.activateAnimation();
            }
        } catch(e){}
    }
}