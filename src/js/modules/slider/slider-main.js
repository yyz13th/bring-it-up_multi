import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, btns) {
        super(container, btns);
    }

    
    showSlides(n) {
         if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        };

        try {
            this.hanson.style.opacity = 0;

            if (n === 3) {
                setInterval(() => {
                    this.hanson.style.opacity = 1;
                    this.hanson.classList.add("animated", "slideInUp");
                }, 3000);
            } else {
                this.hanson.style.opacity = 0;
                this.hanson.classList.remove("animated", "slideInUp");
            }
        }catch(e){}

        Array.from(this.slides).forEach(slide => {
            slide.style.display = "none";
            // slide.classlist.remove("animated", "slideInDown");
        });
        this.slides[this.slideIndex - 1].style.display = "block";
        this.slides[this.slideIndex - 1].classList.add("animated", "fadeIn");
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.plusSlides(1);
            });

            btn.parentNode.previousElementSibling.addEventListener("click", (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex)
            });
        });
    }

    bindSideTriggers(trigger) {
        document.querySelectorAll(trigger).forEach(module => {
            module.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                trigger === '.prevmodule' ? this.plusSlides(-1) : this.plusSlides(1);
            });
        });
    }

    render() {
        if(this.container) {
            try {
                this.hanson = document.querySelector(".hanson");
            } catch (e) {}
        
            this.showSlides(this.slideIndex);
            this.bindTriggers();
            this.bindSideTriggers('.prevmodule');
            this.bindSideTriggers('.nextmodule');
        }
    }
}