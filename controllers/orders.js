const models = require("../models");
const predefinedHeaders = require("./predefinedHeaders");

module.exports = {
  getOrder: (request, response) => {
    const orderid = request.params.id;
    models.orders
      .findOne({
        where: {
          quote_no: orderid,
        },
      })
      .then((getData) => {
        if (getData) {
          response.status(200).send({
            header: predefinedHeaders.success,
            body: getData,
          });
        } else {
          response.status(404).send({
            header: predefinedHeaders.noDataFound,
            body: {},
          });
        }
      })
      .catch((error) => {
        response.status(404).send({
          header: predefinedHeaders.noDataFound,
          body: error,
        });
      });
  },

  addOrder: (request, response) => {
    // response.status(201).send({
    //   header: predefinedHeaders.success,
    //   body: request.body,
    // });
    const { orderid, price, yourName, email, telephone, postcode } = request.body;
    models.orders
      .create({
        quote_no: orderid,
        price: price,
        name: yourName,
        email: email,
        phone: telephone,
        postcode: postcode,
        data: JSON.stringify(request.body)
      })
      .then((data) => {
        response.status(201).send({
          header: predefinedHeaders.success,
          body: data,
        });
      })
      .catch((error) => {
        if (error instanceof models.Sequelize.ForeignKeyConstraintError) {
          response.status(400).send({
            header: predefinedHeaders.validationError,
            body: {
              errorMessage: error.fields + " does not exist!",
              errorDetails: error.name,
            },
          });
        } else if (
          error instanceof models.Sequelize.UniqueConstraintError ||
          error instanceof models.Sequelize.ValidationError
        ) {
          response.status(400).send({
            header: predefinedHeaders.validationError,
            body: {
              errorMessage: error.errors[0].message,
              errorDetails: error.name,
            },
          });
        } else {
          response.status(405).send({
            header: predefinedHeaders.notAllowed,
            body: {
              errorMessage: "Request not allowed! Please check your request.",
            },
          });
        }
      });
  },
};
