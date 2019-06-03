/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global Variables
const pageDiv = document.getElementsByClassName('page')[0];
// value for amount of students we want to display at a time
const perPage = 10;
const pageHeader = document.getElementsByClassName('page-header')[0];
/* Message to display when no search results are found.  Will default to display: none
   and only appear if the results array comes back as 0 */
const sorry = document.createElement('h1');
sorry.textContent = 'Sorry! No results found.';
sorry.style.textAlign = 'center';
pageDiv.appendChild(sorry);
sorry.style.display = 'none';

const searchActivate = () => {
   let filter = searchBar.value.toUpperCase();
   const students = document.getElementsByClassName('student-item');
   // empty array to push search results into
   const _list = [];
   for (let i = 0; i < students.length; i++) {
      const searchTarget = document
         .querySelectorAll('.student-item')[i]
         .querySelector('.student-details')
         .querySelector('h3');
      const h3Text = searchTarget.innerText.toUpperCase();
      if (h3Text.indexOf(filter) === -1) {
         students[i].style.display = 'none';
      } else {
         students[i].style.display = "";
         _list.push(students[i]);
      }
   }
   if (_list.length > 0) {
      showPage(_list, 1);
      sorry.style.display = 'none';
   } else {
      sorry.style.display = '';
   }
   appendPageLinks(_list);
}

// Adding the search bar to the page's header
const appendSearch = () => {
   const searchDiv = document.createElement('div');
   searchDiv.classList.add('student-search');
   const searchBar = document.createElement('input');
   searchBar.id = 'searchBar';
   searchBar.placeholder = 'Search for students...';
   const searchButton = document.createElement('button');
   searchButton.style.cursor = 'pointer';
   searchButton.textContent = 'Search';
   pageHeader.appendChild(searchDiv).appendChild(searchBar);
   searchDiv.appendChild(searchButton);
// Adding search functionality to the input field and activating it with the button
   // searchButton.addEventListener('click', (e) => {
   //    searchActivate();
   // });
   searchButton.addEventListener('click', searchActivate);
   searchBar.addEventListener('keyup', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
         searchActivate();
      }
   });
}

appendSearch();


const showPage = (list, page) => {
   // get first and last item of each page
   const firstItem = (page * perPage) - perPage;
   const lastItem = (page * perPage);
   // loop through the items to pick which names are being shown
   for (let i = 0; i < list.length; i++) {
      if (i >= firstItem && i < lastItem) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}


const appendPageLinks = (list) => {
   let totalPages = Math.ceil(list.length / perPage);

   // const pageButtonDiv = document.getElementsByClassName('pagination')
   //    || document.createElement('div');
   let pageButtonDiv = document.getElementsByClassName('pagination');
   const ul = document.createElement('ul');
   if (!pageButtonDiv.length) {
      pageButtonDiv = document.createElement('div');
      pageButtonDiv.classList.add('pagination');
      pageDiv.appendChild(pageButtonDiv);
      pageButtonDiv.appendChild(ul);
   } else {
      pageButtonDiv[0].innerHTML = '';
      pageButtonDiv[0].appendChild(ul);
   }
   for (let i = 0; i < totalPages; i++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.textContent = i + 1;
      a.href = '#';
      ul.appendChild(li);
      li.appendChild(a);
      document
         .getElementsByClassName('pagination')[0]
         .getElementsByTagName('ul')[0]
         .getElementsByTagName('li')[0]
         .getElementsByTagName('a')[0]
         .classList.add('active');
      a.addEventListener('click', (e) => {
         let page = e.target.text;
         const items = document
            .getElementsByClassName('pagination')[0]
            .getElementsByTagName('ul')[0]
            .getElementsByTagName('li');
         for (let i = 0; i < items.length; i += 1) {
            const anchor = items[i].getElementsByTagName('a')[0];
            const position = anchor.text;

            if (position === page) {
               anchor.classList.add('active');
            } else {
               anchor.classList.remove('active');
            }
         }
         let filter = document.getElementById('searchBar').value;
         if (!filter) {
            showPage(students, page);
         } else {
            let filter = searchBar.value.toUpperCase();
            // let displayTarget = document.querySelectorAll('.student-item');
            const students = document.getElementsByClassName('student-item');
            const _list = [];
            for (let i = 0; i < students.length; i++) {
               const searchTarget = document
                  .querySelectorAll('.student-item')[i]
                  .querySelector('.student-details')
                  .querySelector('h3');
               const h3Text = searchTarget.innerText.toUpperCase();
               if (h3Text.indexOf(filter) === -1) {
                  students[i].style.display = 'none';
               } else {
                  students[i].style.display = "";
                  _list.push(students[i]);
               }
            }
            showPage(_list, page);
         }
      });
   }

}


const students = document.getElementsByClassName('student-item');

// Initiate site's first load
showPage(students, 1);
appendPageLinks(students);




// Remember to delete the comments that came with this file, and replace them with your own code comments.