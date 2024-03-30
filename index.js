/*
Background Images
*/
const backgroundImages = [
  "https://ice.frostsky.com/2024/03/30/e4bafa41d4b5fc78e2a6a43e22f57dd1.gif",
  "https://ice.frostsky.com/2024/03/30/04532a0617776405ce745ed611a1eb74.gif", 
  "https://ice.frostsky.com/2024/03/30/282e33a25df9d0eb3636c76a080cc321.gif",
  "https://ice.frostsky.com/2024/03/30/73323b56ef071b84e52e26bdb9652fb7.gif",
  "https://ice.frostsky.com/2024/03/30/4770d353204ec4e5d084d4c0adc5cff2.gif",
  "https://ice.frostsky.com/2024/03/30/943f9223d16bf83e10ccb6172ec64969.gif",
  "https://ice.frostsky.com/2024/03/30/5cb05d9c6cf9429be91f04ea7052e9c3.gif",
  "https://ice.frostsky.com/2024/03/30/3dd62fcd813063053f66effaa46cdf28.gif",
  "https://ice.frostsky.com/2024/03/30/f74607d29fc5ab43e59e7dde084bc3a4.gif",
  "https://ice.frostsky.com/2024/03/30/4cdd79ff4dcb6e8c3f2519c42ad939a9.gif"
];

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
}

async function changeBackgroundImage() {
  try {
    const backgroundImagesIndex = Math.floor(Math.random() * backgroundImages.length);
    await preloadImage(backgroundImages[backgroundImagesIndex]);
    document.body.style.backgroundImage = `url(${backgroundImages[backgroundImagesIndex]})`;
  } catch (error) {
    console.error("Failed to load background image:", error);
  }
}

function initializeBackgroundChange() {
  changeBackgroundImage();
  // Calculate the time remaining until the next whole hour
  const now = new Date();
  const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
  const timeUntilNextHour = nextHour - now;
  // Set a timeout to change the background image at the next whole hour
  setTimeout(() => {
    initializeBackgroundChange(); // Change the background image
    setInterval(initializeBackgroundChange, 3600000); // Set interval to change every hour
  }, timeUntilNextHour);
}

initializeBackgroundChange();


/*
Click the logo to reload the page
*/
const logoLink = document.querySelector('.logo');
var logo = document.querySelector('.logo');
logo.addEventListener('click', function() {
    location.reload();
});

/*
Late night reminder
*/
function displayMessage() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours >= 0 && hours <= 5) {
        const link = document.createElement("a");
        link.href = "http://www.hitoradio.com/newweb/onair_n_ajax.php";
        link.textContent = "🌛 夜深了";
        link.target = "_blank";
        link.classList.add("reminder");
        link.id = "nightReminderLink";
        // Add a unique id

        // Check if an element with id "nightReminderLink" already exists
        const existingLink = document.getElementById("nightReminderLink");
        if (!existingLink) {
            document.body.appendChild(link);
        }
    } else {
        const existingLink = document.getElementById("nightReminderLink");
        if (existingLink) {
            // If an element with id "nightReminderLink" exists, remove it from the DOM
            existingLink.parentNode.removeChild(existingLink);
        }
    }
}

// Call displayMessage function once after the page has finished loading
window.addEventListener('load', function() {
    displayMessage();
    // Check time every minute
    setInterval(displayMessage, 60000);
});

/*
Middle mouse button scrolling or touchpad sliding
*/
// Get button and content area elements
const buttons = document.querySelectorAll('.sites button');
const contentDivs = document.querySelectorAll('.con');

// Initially display the content corresponding to the first button
showContent(0);

// Add a mouse wheel event listener
document.addEventListener('wheel', handleMouseWheel, {
    passive: false
});

// Define the index of the currently displayed content
let currentIndex = 0;
let isScrolling = false;

function handleMouseWheel(event) {
    if (isScrolling)
        return;

    isScrolling = true;
    setTimeout(()=>{
        isScrolling = false;
    }
    , 100);

    const delta = event.deltaY;
    if (delta > 0) {
        // Scroll down, switch to the next content
        currentIndex = (currentIndex + 1) % contentDivs.length;
    } else {
        // Scroll up, switch to the previous content
        currentIndex = (currentIndex - 1 + contentDivs.length) % contentDivs.length;
    }

    // Display the corresponding content
    showContent(currentIndex);

    // Prevent the default behavior of the scroll event
    event.preventDefault();
}

function showContent(index) {
    // Hide all content areas
    contentDivs.forEach((div)=>{
        div.style.display = 'none';
    }
    );

    // Display the corresponding content area
    contentDivs[index].style.display = 'block';

    // Update button styles
    buttons.forEach((button,i)=>{
        if (i === index) {
            button.classList.add('current');
        } else {
            button.classList.remove('current');
        }
    }
    );
}

/*
Get websites data
*/
async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

function appendListItems(listId, data) {
    const list = document.getElementById(listId);

    data.forEach(item=>{
        const listItem = createListItem(item.link, item.imageSrc, item.text);
        list.appendChild(listItem);
    }
    );
}

function createListItem(link, imageSrc, text) {
    const listItem = document.createElement('li');
    const linkElement = document.createElement('a');
    const imageElement = document.createElement('img');
    const textElement = document.createElement('span');

    linkElement.href = link;
    linkElement.target = '_blank';
    imageElement.src = imageSrc;
    textElement.textContent = text;
    textElement.classList.add('text');

    linkElement.appendChild(imageElement);
    linkElement.appendChild(textElement);
    listItem.appendChild(linkElement);

    return listItem;
}

// Fetch the data and append list items once the data is retrieved
fetchData().then(data=>{
    appendListItems('tools-list', data.toolsData);
    appendListItems('information-list', data.informationData);
    appendListItems('entertainment-list', data.entertainmentData);
    appendListItems('reference-list', data.referenceData);
}
);

/*
Shortcuts
*/
const shortcuts = {
    78: ["https://www.notion.so/login"],
    71: ["https://github.com/login"],
    32: ["https://chat.openai.com/"],
    88: ["https://x.com/"],
    68: ["https://ddys.pro"],
    90: ["https://www.zxzjhd.com"],
    89: ["https://www.youtube.com/?gl=US"],
    66: ["https://www.bilibili.com/"],
    83: ["https://open.spotify.com/"],
    73: ["https://www.iheart.com/live/wnyc-fm-news-talk-culture-5068/"],
    65: ["https://movie.douban.com/mine?status=wish"],
    80: ["https://www.perplexity.ai"]
};

let isNotesFocused = false;

const notesTextarea1 = document.getElementById("notes");
notesTextarea1.addEventListener("focus", () => {
    isNotesFocused = true;
});

notesTextarea1.addEventListener("blur", () => {
    isNotesFocused = false;
});

document.addEventListener("keydown", function(event) {
    if (!isNotesFocused && shortcuts[event.keyCode]) {
        const urls = shortcuts[event.keyCode];
        if (urls.length === 1) {
            window.open(urls[0], "_blank");
        } else if (urls.length === 2) {
            window.open(urls[0], "_blank");
            window.open(urls[1], "_blank");
        }
    }
});


/*
Switch the tabs
*/
const btnArr = document.getElementsByTagName("button");
const divArr = document.getElementsByClassName("con");
for (let i = 0; i < btnArr.length; i++) {
    btnArr[i].index = i;
    btnArr[i].onmouseover = function() {
        for (let j = 0; j < btnArr.length; j++) {
            btnArr[j].className = "";
            divArr[j].style.display = "none"
        }
        this.className = "current";
        divArr[this.index].style.display = "block";
    }
}

/*
Save the notes
*/
const notesTextarea = document.getElementById("notes");

document.addEventListener("DOMContentLoaded", function() {
    const savedContent = localStorage.getItem("notesContent");
    if (savedContent != null) {
        notesTextarea.value = savedContent;
    }

    notesTextarea.addEventListener("keyup", function() {
        const data = notesTextarea.value;
        localStorage.setItem("notesContent", data);
    });
});