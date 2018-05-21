/*
* @Author: MingLU
* @Date:   2018-05-21 13:13:31
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-21 13:14:13
*/

class GetProperty {
  constructor() {
    this.zz_property = [];//需要获取的属性数组
    this.target = {};//需要获取属性的目标对象
    this.ifNone = [];//如果获取不到属性需要返回的指定值，默认为undefined
  }

  /**
   * 需要获取的属性
   * 可以获取一个或多个
   * 一个('a.b.c')
   * 多个('a','b.c')
   * @returns
   */
  get() {
    //将参数变为数组
    let property = Array.from(arguments).map(v => {
      return v.split('.');
    });
    this.zz_property = property.slice(0);
    return this;
  }

  /**
   * 从哪获取
   */
  from(o) {
    this.target = o;
    return this;
  }

  /**
   * 从target参数获取属性
   * @param target 获取属性的目标对象
   * @param property 需要获取的属性
   * @param index 在zz_property属性数组中是第几个
   * @param name 拼接中的属性全名，为了避免获取不同key下的相同属性名做出的兼容措施，如需要获取a.b和c.b，则第一个属性名为b,第二个属性名为c_b
   */
  getProperty(target, property, index, name) {
    //定义返回结果
    let result = {};
    //获取串联属性的长度
    let length = property.length;
    //如果串联属性的长度大于2，则需要递归返回
    if (length > 2) {
      let tar = target[property[0]],//第一个属性值
        param = property.slice(1),//除去第一个属性值的属性数组
        //拼接属性名
        n = name
          ? name + '_' + property[0]
          : property[0];
      //如果存在第一个属性，则进行递归
      if (tar) {
        result = this.getProperty(tar, param, index, n)
      } else {
        //如果第一个属性不存在，则赋值返回
        result.key = property[property.length - 1];
        //串联属性名的拼接
        result.name = name
          ?name + '_' + property.join('_')
          :property.join('_');
        result.value = this.ifNone[index];
      }
    } else if (length === 2) {
      //如果串联属性的长度刚好等于2，则可直接返回
      //获取的属性名
      result.key = property[1];
      //串联属性名的拼接
      result.name = name
        ? (name + '_' + property.join('_'))
        : property.join('_');
      //属性值，判断第一个属性值是否存在，存在则返回第二个属性值，不存在则返回设定值
      result.value = target[property[0]]
        ? target[property[0]][property[1]]
        : this.ifNone[index];
    } else {
      //如果属性长度为1，则可直接返回
      //获取的属性名
      result.key = property[0];
      //属性全名
      result.name = property[0];
      //属性值，如果存在则返回，不存在则返回指定的值（target[property[0]]+'' ，是为了避免值为0的情况）
      result.value = target[property[0]]+'' ? target[property[0]] : this.ifNone[index];
    }
    return result;
  }

  /**
   * 重置参数
   */
  resetParam(){
    this.zz_property = [];//需要获取的属性数组
    this.target = {};//需要获取属性的目标对象
    this.ifNone = [];//如果获取不到属性需要返回的指定值，默认为undefined
  }

  /**
   * 返回结果
   * 参数为获取不到值时候的给定值，默认为undefined
   */
  result() {
    let result = {},
      length = this.zz_property.length;
    //将参赛变为数组
    let property = Array.from(arguments);
    this.ifNone = property.slice(0);
    if (length > 1) {
      this.zz_property.map((v, i) => {
        let obj = this.getProperty(this.target, v, i);
        result[obj.key] ?
          result[obj.name] = obj.value
          : result[obj.key] = obj.value;
      })
    } else {
      let obj = this.getProperty(this.target, this.zz_property[0]?this.zz_property[0]:[]);
      result[obj.key] = obj.value;
    }
    //重置所有参数
    this.resetParam();
    return result;
  }
}

const install = (Vue) => {
  Vue.prototype.z_get = new GetProperty();
};

export default install
