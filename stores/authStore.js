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

  @action async login(props){ 
    const { email , password } = props  
    auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      firebase.database().ref('users/' + response.user.uid)
      .once("value").then( snapshot => {
        console.log(snapshot.val() , response.user , 'log');
        if (snapshot.val().role !== 'user') {          
          storejs.set('currentUser', response.user);
          storejs.set('userData', snapshot.val());
          window.location.href = '/'
        }
        else{
          auth.signOut()
          storejs.set('error',null);
          storejs.set('currentUser', null);
          storejs.set('userData', null);
          return alert('ไม่มีผู้ใช้งานนี้อยู่ในระบบ');
        }
      })
    })
    .catch(error => {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        return alert('รหัสผ่านไม่ถูกต้อง');
      } else {
        return alert('อีเมลไม่ถูกต้อง หรือ ไม่มีอยู่ในระบบ');
      }             
    })  
  }

  @action async logout(){    
    let response = await auth.signOut()
    storejs.set('error',null);
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