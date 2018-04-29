import axios from 'axios'

export function get (url) {
  return axios.get(url)
    .then(response => {
      // console.log(response)
      return response.data
    }).catch(err => {
      console.log(err)
    })
}
