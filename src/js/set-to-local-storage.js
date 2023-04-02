// const refs = {
//     watchedBtn: document.querySelector('.watchedBtn'),
//     queueBtn: document.querySelector('.queueBtn')
// }

// refs.watchedBtn.addEventListener('click', onAddToWatchedList);
// refs.queueBtn.addEventListener('click', onAddToQueueList);

// const watchedData = {}
// const queueData = {}


// function onAddToWatchedList(e) {
//     const modalElements = e.currentTarget.children;
//     console.log(modalElements);

//     const watchedLibrary = {
//         poster: modalElements.img.src,
//         title: modalElements.h2.textContent,
//         genres: modalElements.p.textContent,
//         releaseDate: modalElements.span.textContent
            
//     }

//     watchedData.watchedLibrary = watchedLibrary;
//     localStorage.setItem('addToWatched', JSON.stringify(watchedData))
    
// }

// function onAddToQueueList(e) {
//     const modalElements = e.currentTarget.children;
//     console.log(modalElements);

//     const queueLibrary = {
//         poster: modalElements.img.src,
//         title: modalElements.h2.textContent,
//         genres: modalElements.p.textContent,
//         releaseDate: modalElements.span.textContent
            
//     }

//     queueData.queueLibrary = queueLibrary;
//     localStorage.setItem('addToQueue', JSON.stringify(queueData))
// }
