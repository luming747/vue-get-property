# vue-get-property
get property from object in vue without the case : can't get 'xxx' from undefined

#example
    
    import Vue from 'vue'
    import getProperty from 'vue-get-property'

    Vue.use(getProperty);
    
    let res = {
        respCode:-1,
        respData:{
          list:[],
          data:{
            a:{
              c:1
            },
            b:{
              c:1  
            }
          }
        }
      }
      
    let {respCode,list,c,respData_data_b_c} = this.z_get.get('respCode','respData.list','respData.data.a.c','respData.data.b.c').from(res).result(-1,[],0,0);
    
    
    console.log(respCode,list,c,respData_data_a_c) //-1 [] 1 0

# api
### z_get:
the instance of class

### get:
desc:the property that get from object
param:property name
参数可以是一个属性，也可以是多个属性，更深层的属性使用.符号来获取
### from:
desc:which object we get property
param:object
### result:
desc: get result 
param: give what if get none
如果是数组，则会按顺序对应get方法中获取的属性