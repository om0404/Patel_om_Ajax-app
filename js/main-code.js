(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
 

  // Functions

  let spinner = `

      <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="40px" height="40px">
          <path fill="#333" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
              />
          </path>
      </svg>
 
`;
 

  function fetchInfoBoxes() {
    
      return fetch("https://swiftpixel.com/earbud/api/infoboxes")
          .then(response => response.json())
          .catch(error => {
              console.error('Fetch error:', error);
              return [];
          });
  }

  function loadInfoBoxes() {
      return fetchInfoBoxes().then(infoBoxes => {
          infoBoxes.forEach((box, index) => {
              const hotspot = document.getElementById(`hotspot-${index + 1}`);

              if (hotspot) {
                  hotspot.innerHTML = `
                      <h3>${box.heading}</h3>
                      <p>${box.description}</p>
                      
                  `;
              }
          });
      });
  }

  function fetchMaterials() {
    materialTemplate.innerHTML = spinner;
      return fetch("https://swiftpixel.com/earbud/api/materials")
          .then(response => response.json())
          .catch(error => {
              console.error('Fetch error:', error);
              return [];
          });
  }

  function loadMaterials() {
      materialList.innerHTML = spinner;

      return fetchMaterials().then(materialListData => {
          materialList.innerHTML = ''; // Clear the spinner
          materialListData.forEach(material => {
              const headingElement = document.createElement('h3');
              headingElement.textContent = material.heading;

              const descriptionElement = document.createElement('p');
              descriptionElement.textContent = material.description;

              materialList.appendChild(headingElement);
              materialList.appendChild(descriptionElement);
          });
      });
  }

  function modelLoaded() {
      hotspots.forEach(hotspot => {
          hotspot.style.display = "block";
      });

      // Fetch data for hotspots after the model has loaded
      loadInfoBoxes();
  }

  function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Initial load of data
  loadMaterials();

})();
