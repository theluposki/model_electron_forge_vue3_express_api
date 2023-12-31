[⬅️ retornar para **Documentação**](/docs/indice.md)
# Conta padrão

Ao realizar a instalação, o sistema inclui automaticamente uma conta de acesso com o nível "**administrator**" por padrão.

> Para se autenticar, basta fazer uma solicitação ``POST`` para a rota. ``/api/v1/auth``

|
**Dados**
> Envie um ``JSON`` com os seguintes dados.
```json
{
  "email": "johndoe@mail.com",
  "senha": "MyPassw0rd#2023"
}
```
---
>  você pode fazer o teste pelo terminal usando o ``curl``

|
Requisição com **Curl**
```bash
 curl -sS  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "johndoe@mail.com", "senha": "MyPassw0rd#2023"}' \
  http://localhost:3327/api/v1/auth | jq .
```

Fazendo uma solicitação utilizando **Curl** e armazenando o cookie para utilizações futuras.
```bash
# Faz a solicitação de autenticação e extrai o token do cookie usando awk
TOKEN=$(curl -sS -X POST \
  -H "Content-Type: application/json" \
  -i \
  --cookie-jar cookies.txt \
  -d '{"email": "johndoe@mail.com", "senha": "MyPassw0rd#2023"}' \
  http://localhost:3327/api/v1/auth | awk -F' ' '/token=/ {print $2}' | tr -d '\r\n')


# Imprime o token
echo "Token: $TOKEN"
```

#### Ou

> na sua aplicação ``frontend`` usando ``Axios``

para instalar o axios no seu frontend.

```bash
npm install axios --save
```

> Crie uma "``função``" ou uma "``classe``". 

---

|
Requisição com  **Axios**
```javascript
const request = async () => {
  const url = 'http://localhost:3327/api/v1/auth';
  const data = {
    email: 'johndoe@mail.com',
    senha: 'MyPassw0rd#2023',
  };

  try {
    const response = await axios.post(url, data, {
      mode: 'no-cors',
      cache: 'no-cache',
      withCredentials: true,
      referrerPolicy: 'origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Resposta:', response.data);
  } catch (error) {
    console.error('Erro:', error.message);
  }
};
```
---

Se o processo transcorrer sem problemas, será obtida uma resposta indicando sucesso.

Resposta 
> status code ``200``

- body
```json
{
  "message":"Autenticado com sucesso!"
}
```

A interface de programação enviará um cookie contendo o token de autenticação.

```txt
token	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

___

Caso o usuário ou a senha estejam inválidos, uma resposta será recebida.

> status code ``400``

- body
```json
{
	"error": "Usuário ou Senha invalidos."
}
```

## IMPORTANTE

Após realizar o login, proceda com a criação de uma nova conta, efetuando um post na rota ``/api/v1/users``

Para obter mais detalhes, consulte a página de [criação de conta](/docs/criacao_de_conta.md).