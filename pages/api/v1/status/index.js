function status(request, response) {
  response.status(200).json({ chave: "É a resposta da api na raça!" });
}

export default status;
