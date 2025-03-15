import database from "infra/database.js";

async function status(request, response) {
  console.log("Iniciando o status...");
  const result = await database.query("SELECT 1+1 Resultado;");
  console.log(result.rows);
  console.log(result.rows[0]);
  console.log(result.rows[0].resultado);
  response.status(200).json({ chave: "Alteração do valor retornado" });
}

export default status;
