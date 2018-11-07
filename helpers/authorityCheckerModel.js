import _ from 'lodash'

export default class AuthorityCheckerModel{

    result
    role
    authorities

    constructor(currentUser){
        if(!_.isUndefined(currentUser)){
            this.role = currentUser.roles[0].roleIdentifier
            this.authorities = _.flatMap(currentUser.roles, (role) => _.map(role.authorities, (a) => a.name))
        }
    }

    hasRole(role){
        let result = role === this.role
        if(_.isUndefined(this.result)){
            this.result = result
        }else{
            this.result = this.result && result    
        }
        return this
    }

    hasAuthority(authority){
        let result = _.findIndex(this.authorities, (a) => a === authority) >= 0
        if(_.isUndefined(this.result)){
            this.result = result
        }else{
            this.result = this.result && result
        }
        return this;
    }

    hasAnyAuthority(authorities){
        let result = _.intersection(this.authorities, authorities).length > 0
        if(_.isUndefined(this.result)){
            this.result = result
        }else{
            this.result = this.result && result
        }
        return this;
    }

}