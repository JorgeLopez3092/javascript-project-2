/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const pageDiv = document.getElementsByClassName('page')[0];
// const students = document.getElementsByClassName('student-item');
const perPage = 10;
const names = document.querySelectorAll('.student-details h3');
const pageHeader = document.getElementsByClassName('page-header')[0];




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

   searchButton.addEventListener('click', (e) => {
      console.log('activate');
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
      if (_list.length > 0) {
         showPage(_list, 1);
      } else {
         const sorry = document.createElement('h1');
         sorry.textContent = 'Sorry! No results found.';
         sorry.style.textAlign = 'center';
         if (sorry) {
            pageDiv.removeChild(sorry);
         }
      }
      appendPageLinks(_list);
   });
}

appendSearch();


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
   console.log('working');
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

//to show the first page



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/


// function highlighter(target, list) {
//    let highlighted = target;
//    for(let i = 0; i < list.length; i++)
//    if(i = target) {
//       highlighter.className = 'active';
//    } else {
//       highlighted
//    }
// }





const appendPageLinks = (list) => {
   console.log(list);
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
         console.log(filter);
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