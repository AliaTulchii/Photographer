import langArr from "./../lang";
function languageChanger() {
    const select = document.querySelector('select');
    const allLang = ['ua', 'pl', 'en'];


select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang ;
    location.reload();
    }
    
    function changeLang() {
        let hash = window.location.hash;
        hash = hash.substring(1);

        if (!allLang.includes(hash)) {
            location.href = window.location.pathname + '#ua';
            location.reload();
        }

        select.value = hash;
        // document.querySelector('.lng-nav').innerHTML = langArr['home'][hash];
        for (let key in langArr) {
            let elem = document.querySelector('.lng-' + key);
            if (elem) {
                elem.innerHTML = langArr[key][hash];
            }
            
        }
    }
    changeLang();
}

export default languageChanger;