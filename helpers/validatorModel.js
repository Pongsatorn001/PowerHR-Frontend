import _ from 'lodash'
import { observable } from 'mobx'

export default class ValidatorModel{

    @observable result = [];

    hasAnyError(){
        for(var i = 0 ; i < this.result.length; i++){
            var obj = this.result[i];
            if(obj.errors.length > 0)
                return true;
        }
        return false;
    }

    hasError(fieldName){
        let obj = _.find(this.result, (o) => o.fieldName === fieldName)
        if(obj != null){
            return obj.errors.length > 0
        }
        return false;
    }

    getErrors(fieldName){
        let obj = _.find(this.result, (o) => o.fieldName === fieldName)
        if(obj != null){
            return obj.errors
        }
        return []
    }

    clearAllError(){
        this.result=[];
    }

    addError(invalid, fieldName, message){
        if(!invalid){
            let obj = _.find(this.result, (o) => o.fieldName === fieldName)
            if(obj != null){
                obj.errors.push(message)
                obj.errors = _.uniq(obj.errors);
            }else{
                this.result.push({
                    fieldName,
                    errors: [message]
                })
            }
        }else{
            let obj = _.find(this.result, (o) => o.fieldName === fieldName)
            if(obj != null){
                obj.errors = _.filter(obj.errors, (e) => e !== message);
            }else{
                this.result.push({
                    fieldName,
                    errors: []
                })
            }
        }
    }

}