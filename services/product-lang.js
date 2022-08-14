const { QueryTypes } = require("sequelize");
// const db = require("../config/database");
// const bigObj = require("../trans_obje");

const productLangService = async () => {
  const x = bigObj.Sheet1;
  console.log("called");
  console.log(x.length);

  for (let i = 1500; i < 30000; i++) {
    console.log(i);
    const z = x[i];

    const obj = {
      en: z.english,
      es: z.spanish,
      de: z.german,
    };

    const objString = JSON.stringify(obj);

    const insertTransQuery =
      "update products_local set description_local = ? where slug = ?";

    const desc_local = await db.query(insertTransQuery, {
      replacements: [objString, z.slug],
      type: QueryTypes.UPDATE,
    });
  }
};

module.exports = { productLangService };
