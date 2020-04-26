const allStatesURL = 'https://murmuring-forest-70843.herokuapp.com/api/v1/states';

//fetch method options
var fetchOptions = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

//change the language
function changeLang() {
  var langBtn = document.getElementById('lang-btn');
  if (langBtn.innerText == 'हिंदी में देखें') {
    //to view content in hindi
    //set the text of language button to English
    langBtn.innerText = 'In English';
    //change nav links
    changeLinks('hindi');
    //fetch all states
    fetchAllStates('hindi');
  } else {
    //set the text of language button to hindi
    langBtn.innerText = 'हिंदी में देखें';
    //change nav links
    changeLinks('english');
    //fetch all states
    fetchAllStates('english');
  }
}

//function to change language of links
function changeLinks(lang) {
  var links = document.querySelector('#nav-bar > ul');
  if (lang == 'hindi') {
    links.children[0].children[0].innerText = 'सभी राज्य';
    links.children[1].children[0].innerText = 'हमारे बारे में';
  } else if (lang == 'english') {
    links.children[0].children[0].innerText = 'All States';
    links.children[1].children[0].innerText = 'About US';
  }
}

//function to fetch all states information
function fetchAllStates(lang) {
  //get content div
  var div = document.getElementById('content');
  //clear the div
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
  var table = createNode('table');
  var thead = createNode('thead');
  var tbody = createNode('tbody');
  //table heading row
  trHead = createNode('tr');
  //create table headers
  thSr = createNode('th');
  thStateName = createNode('th');
  thTotalCase = createNode('th');
  thCured = createNode('th');
  thDeath = createNode('th');
  if (lang == 'hindi') {
    fetch(allStatesURL + '?lang=' + lang, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        //add  inner text in hindi to the table headers
        thSr.innerText = 'क्रमांक';
        thStateName.innerText = 'राज्य का नाम';
        thTotalCase.innerText = 'कुल मामले';
        thCured.innerText = 'इलाज हो गया';
        thDeath.innerText = 'मृत';
        //attach respective nodes to parent nodes
        appendToNode(trHead, thSr);
        appendToNode(trHead, thStateName);
        appendToNode(trHead, thTotalCase);
        appendToNode(trHead, thCured);
        appendToNode(trHead, thDeath);
        appendToNode(thead, trHead); //table heading row
        appendToNode(table, thead); //heading attached to table
        //traverse through all the data received
        for (let i = 0; i < data['data'].length; i++) {
          tr = createNode('tr');
          //data
          td1 = createNode('td');
          td1.innerText = data['data'][i]['id'];

          td2 = createNode('td');
          td2.innerText = data['data'][i]['stateName'];

          td3 = createNode('td');
          td3.innerText = data['data'][i]['totalCases'];

          td4 = createNode('td');
          td4.innerText = data['data'][i]['cured'];

          td5 = createNode('td');
          td5.innerText = data['data'][i]['death'];

          //append the data to table rows
          appendToNode(tr, td1);
          appendToNode(tr, td2);
          appendToNode(tr, td3);
          appendToNode(tr, td4);
          appendToNode(tr, td5);

          //append row to table body
          appendToNode(tbody, tr);
        }
        //attach body to table
        appendToNode(table, tbody);
        //add last updated date to the table
        trDate = createNode('tr');
        tdDateTitle = createNode('td');
        tdDateTitle.innerText = 'Last Updated: ';
        appendToNode(trDate, tdDateTitle);
        tdDate = createNode('td');
        tdDate.innerText = data['lastUpdated'];
        appendToNode(trDate, tdDate);
        appendToNode(table, trDate);
        //attach table to div
        appendToNode(div, table);
      });
  } else {
    //default in english
    fetch(allStatesURL + '?lang=english', fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        //add  inner text in hindi to the table headers
        thSr.innerText = 'Sr. No.';
        thStateName.innerText = 'State Name';
        thTotalCase.innerText = 'Total Cases';
        thCured.innerText = 'Cured';
        thDeath.innerText = 'Death';
        //attach respective nodes to parent nodes
        appendToNode(trHead, thSr);
        appendToNode(trHead, thStateName);
        appendToNode(trHead, thTotalCase);
        appendToNode(trHead, thCured);
        appendToNode(trHead, thDeath);
        appendToNode(thead, trHead); //table heading row
        appendToNode(table, thead); //heading attached to table
        //traverse through all the data received
        for (let i = 0; i < data['data'].length; i++) {
          tr = createNode('tr');
          //data
          td1 = createNode('td');
          td1.innerText = data['data'][i]['id'];

          td2 = createNode('td');
          td2.innerText = data['data'][i]['stateName'];

          td3 = createNode('td');
          td3.innerText = data['data'][i]['totalCases'];

          td4 = createNode('td');
          td4.innerText = data['data'][i]['cured'];

          td5 = createNode('td');
          td5.innerText = data['data'][i]['death'];

          //append the data to table rows
          appendToNode(tr, td1);
          appendToNode(tr, td2);
          appendToNode(tr, td3);
          appendToNode(tr, td4);
          appendToNode(tr, td5);

          //append row to table body
          appendToNode(tbody, tr);
        }
        //attach body to table
        appendToNode(table, tbody);
        //add last updated date to the table
        trDate = createNode('tr');
        tdDateTitle = createNode('td');
        tdDateTitle.innerText = 'Last Updated: ';
        appendToNode(trDate, tdDateTitle);
        tdDate = createNode('td');
        tdDate.innerText = data['lastUpdated'];
        appendToNode(trDate, tdDate);
        appendToNode(table, trDate);
        //attach table to div
        appendToNode(div, table);
      });
  }
}

//helper functions
//function to create new elements
function createNode(nodeName) {
  return document.createElement(nodeName);
}
//function to append child to parent
function appendToNode(parent, child) {
  return parent.appendChild(child);
}
