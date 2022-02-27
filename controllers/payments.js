const models = require("../models");
const predefinedHeaders = require("./predefinedHeaders");

module.exports = {
  makePayment: (request, response) => {
    const { animalTypeId, breedName, breedDetails } = request.body;
    models.orders
      .create({
        animalTypeId: animalTypeId,
        breedName: breedName,
        breedDetails: breedDetails,
      })
      .then((animalBreed) => {
        response.status(201).send({
          header: predefinedHeaders.success,
          body: animalBreed,
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
