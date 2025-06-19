import { catsData } from "./data.js";

const emotionRadios = document.getElementById('emotion-radios')
const getImgBtn = document.getElementById('get-img-btn')
const modal = document.getElementById('meme-modal')
const modalInner = document.getElementById('meme-modal-inner')
const modalCloseBtn = document.getElementById('meme-modal-close-btn')
const modalOverlayer = document.getElementById('meme-modal-overlayer')

getImgBtn.addEventListener('click', renderSelectedMeme)
modalCloseBtn.addEventListener('click', closeModal)

emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e) {
    const RadioOptions = document.getElementsByClassName('radio-option-container')
    for (let radioOption of RadioOptions) {
        radioOption.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
    // const selectedRadio = document.querySelector('input[type="radio"]:checked').parentElement
    // selectedRadio.classList.add("checked-radio-container")
}

function renderSelectedMeme() {
    const selectedCat = getSingleCatObject()

    modalInner.innerHTML = `
        <img class="meme-img" id="meme-img" src="./images/${selectedCat.image}">
        <p>${selectedCat.alt}</p>`

    modalOverlayer.style.display = "block"

}

function closeModal() {
    modalOverlayer.style.display = 'none'
}

function getSingleCatObject() {
    const selectedCats = getMatchingCatsArray(catsData)
    if (selectedCats.length === 1) {
        return selectedCats[0]
    }
    const randOption = Math.floor(Math.random() * selectedCats.length)
    return selectedCats[randOption]
}

function getMatchingCatsArray(cats) {
    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
    const isGif = document.getElementById('gifs-only-option').checked

    const catsArray = cats.filter(function (cat) {
        if (isGif) {
            return cat.emotionTags.includes(selectedEmotion) && cat.isGif
        }

        return cat.emotionTags.includes(selectedEmotion)
    })

    return catsArray
}


function getEmotionTagsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionTags(cats) {
    const emotionTags = getEmotionTagsArray(cats)
    console.log(emotionTags)
    let emotionRadiosHTML = ``
    for (let emotion of emotionTags) {
        emotionRadiosHTML += `
        <div class="radio-option-container">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" name="radio-option" value="${emotion}">
        </div>`
    }
    emotionRadios.innerHTML = emotionRadiosHTML
}

renderEmotionTags(catsData)

document.addEventListener("click", clickOutsideModalToClose)

function clickOutsideModalToClose(e) {
    if (modalOverlayer.style.display === "block" && e.target === document.getElementById('meme-modal-overlayer')) {
        closeModal()
    }
}