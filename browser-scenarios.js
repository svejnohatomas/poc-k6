import http from 'k6/http';

export const options = {
   //scenario to view contacts
   scenarios: {
      contacts: {
         executor: 'ramping-vus',
         exec: 'contacts',
         startVUs: 8,
         stages: [
            { target: 8, duration: "30s" },
         ],
      },
      //scenario to view news
      news: {
         executor: 'ramping-vus',
         exec: 'news',
         startVUs: 2,
         stages: [
            { target: 2, duration: "30s" },
         ],
      },
   },
};

//use the exec property to run different scenarios for different functions

export function contacts() {
   http.get('https://test.k6.io/contacts.php');
}

export function news() {
   http.get('https://test.k6.io/news.php');
}