// levantar o servidor de desenvolvimento
// $npm run dev

test("Get to /api/v1/status should return 200", async () => {
  //Testa se retornou codigo de sucesso
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  //Separa o corpo da resposta para facilitar o teste dos elementos
  const responseBody = await response.json();
  //Testa se a propriedade updated_at existe
  expect(responseBody.updated_at).toBeDefined();

  //Testa se o valor da propriedade pode ser convertido numa data válida
  //  e se a data convertida é a mesma que existe na propriedade
  const parseUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdateAt);

  //Testa se a propriedade database_version existe
  expect(responseBody.dependencies.database.version).toBeDefined();
  //Testa a versão do servidor DB - atual 16.0
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  //Testa se a propriedade database_max_conn existe
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  //Testa a quantidade máxima esperada de conn - default 100
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  //Testa se a propriedade database_used_conn existe
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  //Testa a quantidade de conexões abertas - deve ser 1, pois nesse ponto
  // dentro do ambiente dev, só abrimos uma conn por vez. Se abrir mais,
  // tem conn vazando
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});

/* Teste exemplo temporário de SQL Injection
test.only("Teste de SQL Injection", async () => {
  //Chama o teste com injeção de SQL - faz uma espera de 4 segundos
  const response = await fetch(
    "http://localhost:3000/api/v1/status?databaseName=';select pg_sleep(4);--",
  );
});
*/
