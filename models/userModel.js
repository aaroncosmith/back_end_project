const db = require('./conn'),
bcrypt = require('bcryptjs');

class Users {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    checkpassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }
    async save() {
        try {
            const response = await db.one(`
                insert into users 
                    (name, email, password) 
                values 
                    ($1, $2, $3, $4) 
                returning id
                `, [this.name, this.email, this.password]);
            console.log("user was created with id:", response.id);
            return response;
        } catch(err) {
            return err.message;
        }
    }
    async newUser() {
        try {
            const response = await db.one('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;', [this.name, this.email,this.password]);
            return response
        } catch (error) {
            console.error('ERROR', error)
        }
    }
    async userLogin() {
        try {
            const response = await db.one(`SELECT id, name, email, password FROM users WHERE email = $1;`, [this.email]);
            const valid = this.checkpassword(response.password,);

            if(!!valid) {
                const {name, email, id} = response;
                return {isValid: valid, name, email, id: id};
            } else {
                return {isValid:valid}
            }
        } catch (error) {
            console.error('ERROR', error)
            return error
        }
    }
}

module.exports = Users;