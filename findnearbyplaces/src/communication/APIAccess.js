let backendAddress = 'https://oliscott21-imagequiz-backend.herokuapp.com';
backendAddress = "http://localhost:4002";

let apiAccess = {

    addCustomer: (email, password) => {
        return fetch(`${backendAddress}/register`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(x => x.json())
        .then(x => {
            console.log(x);
            return x;
        });
    },

    login: (email, password) => {
        return fetch(`${backendAddress}/login`, {
           method: 'Post',
           credentials: 'include',
           headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Credentials': true
           },
           body: JSON.stringify({email, password})
        })
        .then(x => x.json())
        .then(x => {
            console.log(x);
            return x;
        });
    },

    logout: (email, password) => {
        return fetch(`${backendAddress}/logout`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
       .then(x => x.json())
       .then(x => {
            console.log(x);
            return x;
        });
    },

    getCategories: () => {
        return fetch(`${backendAddress}/category`)
        .then(x => x.json())
        .then(x => {
            console.log(x);
            return x;
        });
    },

    search: (url) => {
        return fetch(`${backendAddress}` + url)
        .then(x => x.json())
        .then(x => {
            console.log(x);
            return x;
        });
    },

    addPlace: (name, category_id, latitude, longitude, description, user_id) => {
        return fetch(`${backendAddress}/place`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({name, category_id, latitude, longitude, description, user_id})
        })
        .then(x => x.json())
        .then(x => {
            console.log(x);
            return x;
        });
    },

    addCat: (name) => {
        return fetch(`${backendAddress}/category`, {
           method: 'Post',
           credentials: 'include',
           headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Credentials': true
           },
           body: JSON.stringify({name})
        })
        .then(x => x.json())
        .then(x => {
            console.log(x);
            return x;
        });
    },

    updatePlace: (place_id, user_id, name, category_id, latitude, longitude, description) => {
      return fetch(`${backendAddress}/place`, {
          method: 'Put',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({place_id, user_id, name, category_id, latitude, longitude, description})
      })
      .then(x => x.json())
      .then(x => {
          console.log(x);
          return x;
      });
    }


}

export default apiAccess;
