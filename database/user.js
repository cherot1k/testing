const UserModel = require('../models/user')

const currentUser = {
    username:'Sasha',
    password:'Sasha'
}

class UserController{
    static findOne({username}){
        //Действия
        // return UserModel.findOne({username}).lean()
        return currentUser
    }

    static createOne(){
        const userObject = {
            username:'Allah',
            password:'Allah',
            name:'Allah',
            surname:'Allah',
            email:'allah@gmail.com',
            contactNumber:'+380665555555',
            role:'user'
        }
        const user = new UserModel(userObject)
        user.save()
    }
}


module.exports = {UserController}