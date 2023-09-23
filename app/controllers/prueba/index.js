const { z } = require("zod");

// Define un esquema de validación usando Zod que coincida con la estructura esperada
const dataSchema = z.array(
  z.object({
    dato1: z.string(),
    dato2: z.number(),
    dato3: z.object({
      id: z.string(),
    }),
    dato4: z.array(z.string()),
  })
);

const getPrueba = async (req, res) => {
  try {
    // Aquí puedes realizar la validación en la respuesta si es necesario
    const responseData = {
      state: true,
      rows: [
        { dati1: "dato 1 ", dato2: "dato 2 " },
        { dati1: "dato 1 ", dato2: "dato 2 " },
      ],
      message: "peticion exitosa ",
    };

    res.status(200).send(responseData);
  } catch (error) {
    res.status(403).send({
      state: true,
      rows: { dati1: "dato 1 ", dato2: "dato 2 " },
      message: "peticion rechazada ",
    });
  }
};

const postPrueba = async (req, res) => {
  try {
    // Validar los datos del cuerpo de la solicitud utilizando el esquema
    const requestBody = req.body;
    const validatedData = dataSchema.parse(requestBody);

    // Si llegamos hasta aquí, los datos son válidos
    res.status(200).send({
      state: true,
      rows: validatedData,
      message: "peticion exitosa",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Si ocurre un error de validación, puedes acceder a los errores
      // y crear mensajes personalizados aquí
      const customErrors = error.errors.map((validationError) => {
        return `Error en ${validationError.path.join(".")} - ${
          validationError.message
        }`;
      });

      res.status(400).send({
        state: false,
        rows: null,
        message: "peticion rechazada",
        errors: customErrors,
      });
    } else {
      // Manejar otros tipos de errores
      console.error("Error inesperado:", error);
      res.status(500).send({
        state: false,
        rows: null,
        message: "peticion rechazada",
      });
    }
  }
};

module.exports = { getPrueba, postPrueba };
