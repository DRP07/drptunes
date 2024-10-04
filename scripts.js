
document.getElementById('song_Form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('songTitle').value.trim();
    const artist = document.getElementById('artistName').value.trim();
    const warningMsg = document.getElementById('warningMsg');

    if (title === '' || artist === '') {
        warningMsg.style.display = 'block';
        return;
    } else {
        warningMsg.style.display = 'none';
    }

    const songList = document.getElementById('songList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `  <span class="song_name">${title}</span> 
                <span class="song_artist"> ~ ${artist}</span>`;
    songList.appendChild(listItem);

    document.getElementById('songTitle').value = '';
    document.getElementById('artistName').value = '';
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
            console.log('Registration successful:', reg.scope);
        }).catch((error) => {
            console.log('registration failed:', error);
        });
    });
}


let deferredPrompt; 

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('event fired');
    event.preventDefault();
    deferredPrompt = event; 
    Installbtn(); 
});

function Installbtn() {
    const installButton = document.getElementById('install_btn');
    installButton.style.display = 'block'; 

    installButton.addEventListener('click', async () => {
        installButton.style.display = 'none'; 
        deferredPrompt.prompt(); 

        const { outcome } = await deferredPrompt.userChoice; 
        deferredPrompt = null; 
        console.log(`User response to the install prompt: ${outcome}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const installButton = document.getElementById('install_btn');
    installButton.style.display = 'none'; 
});
