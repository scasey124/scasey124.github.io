document.addEventListener("DOMContentLoaded", function () {
  // Time update function
  setInterval(function () {
    const timeElement = document.querySelector("#timeElement");
    if (timeElement) {
      timeElement.innerHTML = new Date().toLocaleString();
    }
  }, 1000);

  // Initialization function for windows
  function initializeWindow(elementName) {
    const screen = document.querySelector("#" + elementName);

    // Add tap handling to the window
    function addWindowTapHandling(screen) {
      const icon = document.querySelector(`[data-window="${elementName}"]`);

      if (icon && screen) {
        icon.addEventListener("click", () => {
          if (icon.classList.contains("selected")) {
            icon.classList.remove("selected");
            screen.style.display = "none"; // Hide window if it's selected
          } else {
            document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
            icon.classList.add("selected");
            screen.style.display = "block"; // Show window if icon is clicked
          }
        });
      }
    }

    // Make window closable
    function makeClosable() {
      const closeButton = screen.querySelector(".closebutton");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          screen.style.display = "none";
          const icon = document.querySelector(`[data-window="${elementName}"]`);
          if (icon) {
            icon.classList.remove("selected");
          }
        });
      }
    }

    // Drag functionality
    function dragElement(element) {
      if (!element) return;
      let initialX = 0, initialY = 0, currentX = 0, currentY = 0;
      const header = element.querySelector(".windowheader");

      if (header) {
        header.onmousedown = startDragging;
      } else {
        element.onmousedown = startDragging;
      }

      function startDragging(e) {
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = element.offsetTop - currentY + "px";
        element.style.left = element.offsetLeft - currentX + "px";
      }

      function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    // Apply all initializations
    addWindowTapHandling(screen);
    makeClosable();
    dragElement(screen);

    // Uncomment to make hide the welcome window
    // screen.style.display = "none";
  }

  // Initialize windows
  initializeWindow("welcome");
  initializeWindow("aboutScreen");
  initializeWindow("ResumeScreen");
  initializeWindow("portfolioScreen");
  initializeWindow("connectScreen");
  initializeWindow("eightball");
});

var AboutContent = [
  {
    title: "Introduction",
    content: `
      <div style="display: flex; align-items: center; gap: 10px;">
        <img style="height: 150px; object-fit: cover; border-radius: 16px;" src="face_doodle.png" />
        <h1>Hiya!</h1>
      </div>
      <p style="margin-left: 30px; margin-right: 20px;">
        My name is Sydney and I am a data scientist with a passion for learning and exploring new
        technologies.<br><br>
        I am interested in exploring how ML/AI intersects with human-centered design, ethics, and privacy. My goal is to create solutions that are both innovative and responsible.
      </p>
    </div>`
  },
  {
    title: "Ongoing learning",
    content: `
       <ul class="custom-star-bullets">
  <li>
    I'm dedicated to advancing my mathematical foundation to support my work in machine learning and data analytics.
  </li>
  <li>
    I also like to dabble in website development, where I can creatively combine my technical skills with my creativity to craft visually appealing websites like this!
  </li>
</ul>
    </div>`
  },
  {
    title: "Fun facts",
    content: `
      <ul class="custom-star-bullets">
       <li>
        I was a radio host during both my undergraduate and graduate studies. </li>
        <li>
        I've had a sourdough starter since 2019 and have yet to kill it. </li>
        <li>
        I'm working my way through <a href="https://open.spotify.com/show/7cujpkzRygYyLylnv5SVFu">This Podcast Will Kill You</a> from the very beginning.</li>
        <li>
         I continue to buy film, although I have a pile of undeveloped rolls. </li>
    </div>`
  }
];

function setAboutContent(index) {
  var aboutContent = document.querySelector("#aboutContent");
  aboutContent.innerHTML = AboutContent[index].content;
}

function addToSideBar() {
  var sidebar = document.querySelector("#sidebar");

  sidebar.innerHTML = '';

  for (let i = 0; i < AboutContent.length; i++) {
    var note = AboutContent[i];
    var newDiv = document.createElement("div");
    newDiv.style.cssText = `
      text-align: center; 
      font-size: 12px; 
      margin: 10px 0; 
      padding: 5px;
      cursor: pointer;
    `;
    newDiv.innerHTML = `
      <p style="margin: 0;">
        ${note.title}
      </p>
    `;
    newDiv.addEventListener("click", function() {
      setAboutContent(i);
    });
    sidebar.appendChild(newDiv);
  }
};

var PortfolioContent = [
  { content: `<div class="project-container">
  <div class="project">
    <div class="project-content">
      <div class="project-label">Data Science</div>
      <h4 class="project-title">Coming soon!</h4>
      <div class="project-details">
        <p>claude monet, "morning in the hay near giverney", 1897</p>
        <ul>
          <li>Details</li>
          <li>Details</li>
          <li>Details</li>
        </ul>
      </div>
    </div>
    
    <div class="project-img">
      <img src="/filler.jpg" alt="Test Image" />
    </div>
    
  </div>
</div>` }
];

function setPortfolioContent(index) {
  var portfolioContent = document.querySelector("#portfolioContent");
  portfolioContent.innerHTML = PortfolioContent[index].content;
}

// Automatically set the portfolio content on page load
document.addEventListener("DOMContentLoaded", function () {
  setPortfolioContent(0); // Load first (or only) portfolio item
});

var ConnectContent = [
  { title: "Let's connect!",
    content: `
    <ul class="custom-star-bullets">
       <li>
        <a href="https://www.linkedin.com/in/sydney-casey-a47697b7/">LinkedIn</a></li>
        <li>
          <a href="https://github.com/scasey124">Github</a></li>
          <li>
            <a href="https://public.tableau.com/app/profile/sydney.casey/vizzes">Tableau</a></li>
        
  ` }
];

function setConnectContent(index) {
  var connectContent = document.querySelector("#connectContent");
  connectContent.innerHTML = ConnectContent[index].content;
}

// Automatically set the portfolio content on page load
document.addEventListener("DOMContentLoaded", function () {
  setConnectContent(0); // Load first (or only) connect item
});


document.addEventListener('DOMContentLoaded', addToSideBar);

document.getElementById('askButton').addEventListener('click', function() {
  const answers = [
    'Yes', 'No', 'Maybe', 'Ask again later', 'Cannot predict now',
    'Definitely not', 'Absolutely!', 'My sources say no', 'It is certain', 'Don’t count on it'
  ];

  // Randomly pick an answer
  const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

  // Display the answer in the #answer div
  document.getElementById('answer').innerText = randomAnswer;

  // Show the 8-ball container
  document.getElementById('eightball').style.display = 'flex';

  // Optionally, animate the ball to "shake" before revealing the answer
  const magicBall = document.getElementById('magicball');
  magicBall.style.animation = 'shake 1s ease';

  // Remove the animation after it ends (to reset for the next click)
  magicBall.addEventListener('animationend', function() {
    magicBall.style.animation = '';
  });
});
