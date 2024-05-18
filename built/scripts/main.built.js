(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var html = document.documentElement;
        var main = document.querySelector('#main');

        var scrollGalleryWorkCard = main.querySelector('#scroll-gallery-work-card');
        var scrollContainer = scrollGalleryWorkCard.querySelector('.scroll-container');
        var cardSet = scrollContainer.querySelector('.card-set');
        var cards = cardSet.querySelectorAll('.card');
        var cardOffset = cards[0].offsetWidth;
        var cardModalButtons = cardSet.querySelectorAll('.card-modal-button');

        var paddlenav = scrollGalleryWorkCard.querySelector('.paddlenav');
        var paddlenavPrev = paddlenav.querySelector('.paddlenav-arrow-previous');
        var paddlenavNext = paddlenav.querySelector('.paddlenav-arrow-next');

        var workCardModals = document.querySelectorAll('.work-card-modal');

        var updatePaddlenavButtons = function() {
            var scrollLeft = scrollContainer.scrollLeft;
            var scrollWidth = scrollContainer.scrollWidth;
            var clientWidth = scrollContainer.clientWidth;
            paddlenavPrev.disabled = scrollLeft === 0;
            paddlenavNext.disabled = scrollLeft + clientWidth === scrollWidth;
        };

        var scrollGallery = function(direction) {
            scrollContainer.scrollBy({
                left: direction * cardOffset,
                behavior: 'smooth'
            });
        };

        var scrollGalleryToCard = function(index) {
            scrollContainer.scrollTo({
                left: cardOffset * index,
                behavior: 'smooth'
            });
        };

        var openCardModal = function(index) {
            var modal = workCardModals[index];
            html.classList.add('has-modal', 'has-modal-page-overlay');
            modal.classList.add('modal-open', 'visually-visiable');
            modal.querySelector('.modal-overlay').focus();
            modal.scrollTop = 0;
        };

        var closeCardModal = function(index) {
            var modal = workCardModals[index];
            html.classList.remove('has-modal', 'has-modal-page-overlay');
            modal.classList.remove('modal-open', 'visually-visiable');
            cardModalButtons[index].focus();
            scrollGalleryToCard(index);
        };

        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'ArrowLeft':
                    scrollGallery(-1);
                    break;
                case 'ArrowRight':
                    scrollGallery(1);
                    break;
                default:
                    break;
            }
        });

        cardModalButtons.forEach(function(cardModalButton, index) {
            cardModalButton.addEventListener('click', function() {
                openCardModal(index);
            });
        });

        workCardModals.forEach(function(workCardModal, index) {
            workCardModal.addEventListener('click', function(event) {
                var isOutside = event.target.closest('.modal-content-container') === null;
                if (isOutside) {
                    closeCardModal(index);
                }
            });

            workCardModal.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    closeCardModal(index);
                }
            });
        });

        paddlenavPrev.addEventListener('click', function() {
            scrollGallery(-1);
        });
        paddlenavNext.addEventListener('click', function() {
            scrollGallery(1);
        });
        scrollContainer.addEventListener('scroll', updatePaddlenavButtons);
        updatePaddlenavButtons();
    });
})();
