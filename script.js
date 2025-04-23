document.addEventListener("DOMContentLoaded", function() {
  // Time update function
  setInterval(function() {
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
        I am interested in exploring how ML/AI intersects with human-centered design, ethics, and privacy, aiming to create solutions that are both innovative and responsible.
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
  {
    content: `<div class="project-container">
  <div class="project">
    <div class="project-content">
      <div class="project-label">Data Science / Data Engineering</div>
      <h4 class="project-title">End-to-End Unsupervised ML Pipeline for Pharmaceutical Adverse Events Analysis</h4>
      <div class="project-details">
        <p>Developed a scalable, containerized data analytics pipeline to analyze FDA drug adverse event data using unsupervised machine learning. Designed and implemented an end-to-end ETL workflow leveraging Docker, Apache Airflow, and the OpenFDA API. Built an object-oriented framework to process both structured and unstructured data, applying scikit-learn clustering algorithms to uncover patterns in adverse event reports. Integrated a PostgreSQL persistence layer and am architecting the solution for seamless deployment on cloud platforms such as AWS and GCP.
        </p>
        <ul>
          <li>Python, OOP, API integration, Machine Learning</li>
          <li>Docker, Airflow, PostgreSQL</li>
          <li>Personal project</li>
        </ul>
      </div>
    </div>
    
    <div class="project-img">
      <img src="/filler.jpg" alt="claude monet, «morning in the hay near giverney», 1897 year" />
    </div>
    
  </div>
</div>`},

  {
    content: `<div class="project-container">
    <div class="project">
      <div class="project-content">
        <div class="project-label">Data Science</div>
        <h4 class="project-title"> PubMed Insight Explorer: Article Discovery & Semantic Analysis Tool</h4>
        <div class="project-details">
          <p>This interactive Streamlit application enables users to perform intelligent literature exploration by querying the PubMed database for the latest research articles using a custom keyword. Upon retrieval, articles are organized into a downloadable CSV format enriched with key metadata such as publication date, journal name, and author details.

In addition to basic search, the tool performs keyword co-occurrence analysis, generating an interactive network graph that visualizes relationships between frequently mentioned terms—helping users identify patterns, emerging subtopics, or research clusters. To further assist with synthesis, the application will integrate cutting-edge Natural Language Processing (NLP) features (being implemented at the moment).
          </p>
          <ul>
            <li>Python</li>
            <li>NLP,  API integration, Streamlit</li>
            <li>Personal project</li>
          </ul>
        </div>
      </div>

      <div class="project-img">
        <img src="/filler.jpg" alt="claude monet, «morning in the hay near giverney», 1897 year" />
      </div>

    </div>
  </div>`},

  {
    content: `<div class="project-container">
      <div class="project">
        <div class="project-content">
          <div class="project-label">Data Analytics</div>
          <h4 class="project-title"> Healthcare Quality Improvement Analytics (Synthetic Data)</h4>
          <div class="project-details">
            <p>Analyzed synthetic healthcare quality improvement data to explore patient demographics using R for data cleaning, transformation, and statistical analysis. Developed a dynamic, interactive Tableau dashboard to communicate key insights and trends, highlighting demographic patterns. Optimized the dashboard for clarity and usability with filterable views and drill-down capabilities, enhancing user engagement and interpretability.
            </p>
            <ul>
              <li>R</li>
              <li>Tableau, Data preprocessing, Analytics</li>
              <li>Personal project</li>
            </ul>
          </div>
        </div>

        <div class="project-img">
          <img src="/filler.jpg" alt="claude monet, «morning in the hay near giverney», 1897 year" />
        </div>

      </div>
    </div>`},

  {
    content: `<div class="project-container">
    <div class="project">
      <div class="project-content">
        <div class="project-label">Data Science</div>
        <h4 class="project-title"> Predicting Length of Critical Care Days in Welsh Intensive Care</h4>
        <div class="project-details">
          <p>Developed and optimized a two-stage predictive model using a Random Forest classifier and XGBoost regressor to estimate critical care days from a novel electronic health records dataset. Achieved a mean absolute error (MAE) of 1.732 and a sensitivity of 0.892 for cases under nine days. Leveraged SHAP (Shapley Additive Explanations) to identify key predictive features and improve model interpretability.
          </p>
          <ul>
            <li>Python</li>
            <li>Machine Learning, Real world data, EHR</li>
            <li>UCL MSc</li>
          </ul>
        </div>
      </div>

      <div class="project-img">
        <img src="/filler.jpg" alt="claude monet, «morning in the hay near giverney», 1897 year" />
      </div>

    </div>
  </div>`}
];

function createProjectNavigation() {
  const navContainer = document.querySelector("#portfolioNav");
  PortfolioContent.forEach((project, index) => {
    const button = document.createElement("button");
    button.textContent = `Project ${index + 1}`;
    button.className = "portfolio-nav-button"; // Apply the CSS class
    button.onclick = () => setPortfolioContent(index);
    navContainer.appendChild(button);
  });

  // Set the first project by default
  setPortfolioContent(0);
}

// Call this function when the page loads
window.onload = function() {
  createProjectNavigation();
};

function setPortfolioContent(index) {
  var portfolioContent = document.querySelector("#portfolioContent");
  console.log(PortfolioContent[index].content); // Check the content
  portfolioContent.innerHTML = PortfolioContent[index].content;
}

// Automatically set the portfolio content on page load
document.addEventListener("DOMContentLoaded", function() {
  setPortfolioContent(0); // Load first (or only) portfolio item
});

var ConnectContent = [
  {
    title: "Let's connect!",
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
document.addEventListener("DOMContentLoaded", function() {
  setConnectContent(0); // Load first (or only) connect item
});


document.addEventListener('DOMContentLoaded', addToSideBar);

document.getElementById('askButton').addEventListener('click', function() {
  const answers = [
    'It is certain', 'Reply hazy, try again', 'Don’t count on it', 'It is decidedly so', 'Ask again later', 'My reply is no',
    'Without a doubt', 'Better not tell you now', 'My sources say no', 'Yes definitely', 'Cannot predict now', 'Outlook not so good', 'You may rely on it', 'Concentrate and ask again', 'Very doubtful', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes, Signs point to yes'
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
