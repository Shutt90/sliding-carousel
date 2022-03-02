import gsap from "/node_modules/gsap/src/all.js";

const carouselSlider = function(container, leftArrow, rightArrow) {
    const carouselContainer = document.querySelector(container)

    let index = 0;

    function tweenIn (target, direction) {
        const tl = gsap.timeline({ paused: true });

        if(direction === 'right') {
            tl.to(target, { display: 'block', duration: 0.01})
            tl.fromTo(target, { x: -100, duration: 0.5, opacity: 0 }, {opacity: 1, x: 0,})
        } else if (direction === 'left') {
            tl.to(target, { display: 'block', duration: 0.01})
            tl.fromTo(target, { x: 100, duration: 0.5, opacity: 0 }, {opacity: 1, x: 0,})
        }

        return tl
        
    }

    function tweenOut (currentDisplayed, direction) {
        const tl = gsap.timeline({ paused: true });

        if(direction === 'right') {
            tl.to(currentDisplayed, {x: 100, opacity: 0, duration: 0.5})
            tl.to(currentDisplayed, { display: 'none', duration: 0.01})
        } else if (direction === 'left') {
            tl.to(currentDisplayed, {x: -100, opacity: 0, duration: 0.5})
            tl.to(currentDisplayed, { display: 'none', duration: 0.01})
        }

        return tl

    }

    if(carouselContainer != null) {

        let imgs = carouselContainer.querySelectorAll('img')

        if(carouselContainer.querySelector(leftArrow) || carouselContainer.querySelector(rightArrow)) {
            console.error('Arrows cannot be inside the carousel container div. Place them in an outer container')
        }

        imgs.forEach(img => {
            img.style.display = 'none'
        })
        imgs[index].style.display = 'block'
        
        const arrowLeft = document.querySelector(leftArrow)
        const arrowRight = document.querySelector(rightArrow)

        arrowLeft.addEventListener('click', function(e) {
            let animationLeftOut = tweenOut(imgs[index], 'left')
            animationLeftOut.play()
            index--
            if(index === -1) {
                index = imgs.length - 1
            }
            let animationLeft = tweenIn(imgs[index], 'left')
            setTimeout(function() {
                animationLeft.play()
            }, 500)


        })

        arrowRight.addEventListener('click', function(e) {

            let animationRightOut = tweenOut(imgs[index], 'right')
            animationRightOut.play()
            index++
            if(index === imgs.length) {
                index = 0
            }
            let animationRight = tweenIn(imgs[index], 'right')
            setTimeout(function() {
                animationRight.play()
            }, 500)

        })


    } else {
        console.error("No container present")
    }

}

export default carouselSlider