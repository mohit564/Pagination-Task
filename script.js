getUsers();

// To get users list from server
async function getUsers() {
  const data = await fetch(
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
  );
  const users = await data.json();

  sessionStorage.setItem("currentPage", 1);
  displayUsers(users);
}

// To display users information on screen
function displayUsers(users) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const currentPage = sessionStorage.getItem("currentPage");
  const totalPages = Math.ceil(users.length / 10);

  // Creating table to display users
  const table = document.createElement("table");

  // Creating headings for the table
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.textContent = "Id";
  const th2 = document.createElement("th");
  th2.textContent = "Name";
  const th3 = document.createElement("th");
  th3.textContent = "Email";

  tr.append(th1, th2, th3);
  table.append(tr);

  // To display 10 users per page
  users.slice((currentPage - 1) * 10, currentPage * 10).forEach((user) => {
    // Creating row with individual user data
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.textContent = user.id;
    td2.textContent = user.name;
    td3.textContent = user.email;

    tr.append(td1, td2, td3);
    table.append(tr);
  });

  container.append(table);
  displayNavigator(users, currentPage, totalPages);
}

// To display navigation bar at bottom of page
function displayNavigator(users, currentPage, totalPages) {
  const container = document.querySelector(".container");

  // Creating navigation bar
  const navigator = document.createElement("div");

  // firstButton will takes us to page 1
  const firstButton = document.createElement("button");
  firstButton.textContent = "First";
  firstButton.addEventListener("click", function () {
    sessionStorage.setItem("currentPage", 1);
    displayUsers(users);
  });

  // previousButton will takes us to one page back from current page
  const previousButton = document.createElement("button");
  previousButton.textContent = "Previous";
  previousButton.addEventListener("click", function () {
    if (currentPage > 1)
      sessionStorage.setItem("currentPage", Number(currentPage) - 1);
    displayUsers(users);
  });

  navigator.append(firstButton, previousButton);

  // Adding button for each page from total number of pages
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", function () {
      sessionStorage.setItem("currentPage", i);
      displayUsers(users);
    });

    // current page button will have different style
    if (i == currentPage) {
      button.className = "current-page";
    }

    navigator.append(button);
  }

  // nextButton will takes us to one page forward from current page
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages)
      sessionStorage.setItem("currentPage", Number(currentPage) + 1);
    displayUsers(users);
  });

  // lastButton will takes us to last page of total pages
  const lastButton = document.createElement("button");
  lastButton.textContent = "Last";
  lastButton.addEventListener("click", function () {
    sessionStorage.setItem("currentPage", totalPages);
    displayUsers(users);
  });

  navigator.append(nextButton, lastButton);
  container.append(navigator);
}
