const db = require('./conn')

class getImageDisplay {
    constructor(id, picture_id) {
        this.id = id;
        this.picture_id = picture_id;
        
    }
    static async renderImage() {
        try {
            const response = await db.any(`SELECT picture -> 'images' AS img FROM images;`);
            return response;
        } catch (error) {
            console.error('ERROR', error);
            return error;
        }
    }
    static async getById(picture) {
        try {
            const response = await db.one(`SELECT picture -> 'images' AS img FROM images WHERE body[0]img[${picture}];`);
            return response;
        } catch (error) {
            console.error('ERROR', error)
            return error;
        }
    }
}

module.exports = getImageDisplay;