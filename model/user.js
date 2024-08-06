const db = require('../db');

class User {
  constructor(id, email, name, password) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
  }
  static async create(user) {
    try {
      await db.put(`user:${user.id}`, user);
      console.log('User created Succefully');
    } catch (err) {
      console.error(err);
    }
  }
  static async getById(id){
    try{
      const user=await db.get(`user:${id}`);
      return user;
    }catch(err){
      if(err.NotFound){
        console.log('User not found',err)
      }else{
        console.log('Eroor fetching the user',err)
      }
    }
  }
  static async update(user){
    try{
      await db.put(`user:${user.id}`);
      console.log("Succefully Updated")

    }catch(err){
      console.error('Failed to Update the user',err)
    }
  }
  static async delete(id){
    try{
      await db.del(`user:${id}`);
      console.log('Deleted succesfully')
    }catch(err){
      console.error('Failed to delete the user',err)
    }
  }

}
module.exports=User;
