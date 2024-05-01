//about use review slider
let reviews = document.querySelectorAll('.review-wrapper');

let currentReviews = [0, 2];

let updateReviewSlider = (cards) => {

    cards.forEach((card_index) => {
        reviews[card_index].classList.add('active');     
    })
}

setInterval(() =>{
    currentReviews.forEach((card_index, i) => {
        reviews[card_index].classList.remove('active');   

        currentReviews[i] = card_index >= reviews.length - 1 ? 0: card_index + 1;
    })
    setTimeout(() =>{
        updateReviewSlider(currentReviews)

    },250)

} ,5000)

updateReviewSlider(currentReviews)

//faq
let faqs = [...document.querySelectorAll('.faq')];

faqs.map(faq => { 
    let ques = faq.querySelector('.question-box');

    ques.addEventListener('click',() => {
        faq.classList.toggle('active');
    })

})
