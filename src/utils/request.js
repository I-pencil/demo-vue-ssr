import axios from 'axios'

export function get (url, params) {
  return axios.get(url, params)
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}
