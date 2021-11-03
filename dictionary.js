async function getHTML() {
    const requestUrl = "https://www.dictionary.com/e/word-of-the-day/"
    //const requestUrl = "https://www.dictionary.com/e/word-of-the-day/columbarium-2021-11-01/"
    
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(requestUrl)}`)

    if (response.ok) {
        const jsonData = await response.json()
        return jsonData.contents;
    } else {
        throw new Error('Network response was not ok.')
    }
}

async function getData() {
    const htmlData = await getHTML();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, "text/html");

    const data = {
        date: doc.querySelector("div.otd-content.wotd-content > div > div:nth-child(1) > div.otd-item-wrapper-content > div.wotd-item > div > div.otd-item-headword__date > div").innerText.trim(),
        word: doc.querySelector("div.otd-content.wotd-content > div > div:nth-child(1) > div.otd-item-wrapper-content > div.wotd-item > div > div.otd-item-headword__word > h1").innerText.trim(),
        phonetic: {
            text: doc.querySelector("div.otd-content.wotd-content > div > div:nth-child(1) > div.otd-item-wrapper-content > div.wotd-item > div > div.otd-item-headword__pronunciation > div").innerText.trim(),
            url: doc.querySelector("div.otd-content.wotd-content > div > div:nth-child(1) > div.otd-item-wrapper-content > div.wotd-item > div > div.otd-item-headword__pronunciation > div > a").href.trim(),
        },
        type: doc.querySelector("div.otd-content.wotd-content > div > div:nth-child(1) > div.otd-item-wrapper-content > div.wotd-item > div > div.otd-item-headword__pos-blocks > div > p:nth-child(1)").innerText.trim(),
        defintiion: doc.querySelector("div.otd-content.wotd-content > div > div:nth-child(1) > div.otd-item-wrapper-content > div.wotd-item > div > div.otd-item-headword__pos-blocks > div > p:nth-child(2)").innerText.trim(),
    }

    data.phonetic.text = data.phonetic.text.slice(1, -1).trim()
    data.date = new Date(data.date)

    return data
}

export default getData;