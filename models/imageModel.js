const db = require("./conn");

class PictureReviewModel{
  constructor(id, picture) {
    this.id = id;
    this.picture = picture;
  }

  static async getAllPictures() {
    try {
      const response = await db.any(`SELECT * FROM images;`);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getPicturesById(r_id) {
    try {
      const response = await db.any(
        `SELECT * FROM images WHERE id = ${r_id};`
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getCommentsByImageId(r_id) {
    try {
      const response = await db.any(
        `SELECT * FROM comments WHERE images_id = ${r_id};`
      );
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }
  static async addComment(r_id, comment) {
    try {
      const response = await db.one(
        `INSERT INTO comments (user_id, picture_id, comment) VALUES ($1, $2, $3) RETURNING id`,
        [r_id, review_title, review_text]
      );

      return response;
    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }
  }
}

module.exports = PictureReviewModel;