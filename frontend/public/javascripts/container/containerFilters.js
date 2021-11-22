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