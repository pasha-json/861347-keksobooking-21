"use strict";
(function () {
  window.card.fillCard = {
    fill: function fillCard(index = 0) {
      const TRANSLATIONS = {
        flat: `Квартира`,
        bungalow: `Бунгало`,
        house: `Дом`,
        palace: `Дворец`
      };

      const cardTemplate = document.querySelector(`#card`).content;
      const accomodationObject = window.pin.mocks.mock[index];
      const newCardTemplate = window.main.clone(cardTemplate);
      const newCardTitle = newCardTemplate.querySelector(`.popup__title`);
      const newCardAddress = newCardTemplate.querySelector(`.popup__text--address`);
      const newCardPrice = newCardTemplate.querySelector(`.popup__text--price`);
      const newCardType = newCardTemplate.querySelector(`.popup__type`);
      const newCardGuestsAndRooms = newCardTemplate.querySelector(`.popup__text--capacity`);
      const newCardCheckinCheckoutTimes = newCardTemplate.querySelector(`.popup__text--time`);
      const newCardDescription = newCardTemplate.querySelector(`.popup__description`);
      const newCardPhotos = newCardTemplate.querySelector(`.popup__photos`);
      const newCardImageItem = newCardPhotos.querySelector(`img`);
      const newCardUserAvatar = newCardTemplate.querySelector(`.popup__avatar`);
      const newCardCloseButton = newCardTemplate.querySelector(`.popup__close`);
      newCardTitle.textContent = accomodationObject.offer.title;
      newCardAddress.textContent = accomodationObject.offer.address;
      newCardPrice.textContent = `${accomodationObject.offer.price}₽/ночь`;
      newCardType.textContent = `${TRANSLATIONS[accomodationObject.offer.type]}`;
      newCardGuestsAndRooms.textContent = `${accomodationObject.offer.rooms} комнаты для ${accomodationObject.offer.guests} гостей`;
      newCardCheckinCheckoutTimes.textContent = `Заезд после ${accomodationObject.offer.checkin}, выезд до ${accomodationObject.offer.checkout}`;
      newCardDescription.textContent = `${accomodationObject.offer.description}`;
      newCardUserAvatar.src = `${accomodationObject.author.avatar}`;
      newCardImageItem.src = accomodationObject.offer.photos[0];

      if (accomodationObject.offer.photos.length > 1) {
        for (let i = 1; i < accomodationObject.offer.photos.length; i++) {
          const newImage = newCardImageItem.cloneNode(true);
          newImage.src = accomodationObject.offer.photos[i];
          newCardPhotos.appendChild(newImage);
        }
      }

      const newCardFeatures = newCardTemplate.querySelector(`.popup__features`).children;
      for (let j = 0; j < newCardFeatures.length; j++) {
        newCardFeatures[j].classList.add(`hidden`);
      }

      for (let k = 0; k < accomodationObject.offer.features.length; k++) {
        const visibleFeature = newCardTemplate.querySelector(`.popup__feature--${accomodationObject.offer.features[k]}`);
        visibleFeature.classList.remove(`hidden`);
      }

      const filtersContainer = document.querySelector(`.map__filters-container`);

      const mapBlock = document.querySelector(`.map`);
      mapBlock.insertBefore(newCardTemplate, filtersContainer);

      document.addEventListener(`keydown`, onPopUpEscPress);
      newCardCloseButton.addEventListener(`click`, window.card.popup.close);

    }
  };

  function onPopUpEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.card.popup.close();
    }
  }

  window.card.popup = {
    close: function closePopup() {
      const popup = document.querySelector(`.popup`);
      if (popup) {
        popup.remove();
      }
      document.removeEventListener(`keydown`, onPopUpEscPress);
    }
  };
})();