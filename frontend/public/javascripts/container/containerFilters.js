// Function to take in filter data and the filter container reference 
// and display them on the page

export function displayFilters(promiseData, containerFilter) {
    promiseData.then(oOptions => {
      for(let idOption=0; idOption<=oOptions.length - 1; idOption++) {
        let elOption = document.createElement("option");
        elOption.value = oOptions[idOption].id;
  
        elOption.innerHTML = oOptions[idOption].name;
  
        containerFilter.appendChild(elOption);
      }
    });
};