// levantar o servidor de desenvolvimento
// >npm run dev
test("Get to /api/v1/status should return 200", async () => {
  //Testa se retornou codigo de sucesso
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  //Testa se a propriedade existe
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  //Testa se o valor da propriedade pode ser convertido numa data válida
  //  e se a data convertida é a mesma que existe na propriedade
  const parseUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdateAt);
});
