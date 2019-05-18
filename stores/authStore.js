import { action, observable, toJS } from 'mobx'
import storejs from 'store'
import _ from 'lodash'
import { auth , firebase } from '../firebase/index'
import axios from 'axios'

let store = null

class AuthStore {

  @observable currentUser = null
  @observable userData = null
  @observable error = null

  constructor(isServer) {
    this.error = storejs.get('error')
    this.currentUser = storejs.get('currentUser')
    this.userData = storejs.get('userData')
  }

  @action async createUser(data){
    auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(response => {
      const result = {
        name : data.name,
        email : data.email,
        password : data.password,
        role : data.role,
        uid : response.user.uid
      }
      firebase.database().ref('users/' + response.user.uid).set(result)
      window.location.href = "/user/user"
    })
    .catch(error => {
      data.setOpen(true)
      data.setMessageLog(error.message)
    })
  }

  @action async updateUser(data , uid){
    const result = {
      name : data.name,
      email : data.email,
      password : data.password,
      role : data.role,
      uid : uid
    }
    firebase.database().ref('users/' + uid).update(result)
    window.location.href = "/user/user"
  }

  @action async login(response,email){    
    storejs.set('accessToken', response.user.uid);
    storejs.set('currentUser', response.user);
    const url = `http://localhost:4000/user/alldata/${email}`
    const res = await axios.get(url)
    if (res) {
      storejs.set('userData', res.data);      
    }
  }

  @action async logout(){    
    let response = await auth.signOut()
    storejs.set('accessToken',null);
    storejs.set('currentUser', null);
    storejs.set('userData', null);
    return window.location.href = '/'
  }

}

export default function initAuthStore(isServer) {
  if (isServer) {
    return new AuthStore(isServer)
  } else {
    if (store === null) {
      store = new AuthStore(isServer)
    }
    return store
  }
}