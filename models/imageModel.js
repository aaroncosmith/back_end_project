const db = require('./conn')


class getImageDisplay {
    constructor(id, picture_id) {
        this.id = id;
        this.picture_id = picture_id;
        
    }
    static async pushImg(url) {
        try {
            const response = await db.one('INSERT INTO images (picture) VALUES ($1) RETURNING id;', [url]);
    return response
        } catch (error) {
            console.error('ERROR', error);
            return error
        }
    }
    static async renderImage() {
        try {
            const response = await db.any(`SELECT * FROM images;`);
            return response;
        } catch (error) {
            console.error('ERROR', error);
            return error;
        }
    }
    static async getById(picture) {
        try {
            const response = await db.one(`SELECT * FROM images WHERE id = ${picture}`);
            return response;
        } catch (error) {
            console.error('ERROR', error)
            return error;
        }
    }
}

module.exports = getImageDisplay;