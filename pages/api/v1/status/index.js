import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const dabaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue = Number(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  //Para testar o exemplo de SQL injection através de parametro (?databaseName=) da requisição
  //const databaseName = request.query.databaseName;
  //console.log(`O nome do banco de dados selecionado é '${databaseName}'`);
  //usar a consulta "SELECT * FROM pg_stat_activity WHERE datname = 'local_db';", (solução 1)

  // Obtem o nome do banco das variáveis de ambiente
  const databaseName = process.env.POSTGRES_DB;
  // Busca na view de estat. de atividade do DBS, as conexões com o banco da aplicação
  // usando o formato de Parameterized Query para evitar ataques de SQL Injection
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  // A quantidade de linhas no resultado da solução 1
  // é a quantidade de sessões abertas. Nessa segunda solução, é a coluna count.
  // Como o typecast da coluna foi feito direto no select, não precisa de parseInt()
  const databaseOpenedConnectionsValue =
    //databaseOpenedConnectionsResult.rows.length, (solução 1)
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dabaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
