# Testes

## Testes Unitários:

### BasePage:

Teste: Renderizar Componente;

Entrada: Iniciar componente com o titulo 'Catch your pokemon';
Esperado: BasePage existir na tela;

### Button:

Teste: Renderizar Componente;

Entrada: Iniciar componente com o texto 'Bora Jogar';
Esperado: Button existir na tela e ter o texto 'Bora Jogar';

### CodeModal:

Teste: Renderizar campo de código;

Entrada: Iniciar componente e colocar código pokemon no input;
Esperado: Codigo no input deve ser o mesmo que foi colocado;

Teste: Renderizar botão de finalizar;

Entrada: Iniciar componente;
Esperado: Botão de finalizar existir na tela;

Teste: Clicar no botão de finalizar;

Entrada: Iniciar componente, colocar valor no campo de código e clicar no botão de finalizar;
Esperado: Ao clicar no botão validar se função do botão foi chamada;

Teste: Verificar se botão está desabilitado quando não tem nenhum valor no campo de código;

Entrada: Iniciar componente;
Esperado: Que botão esteja desabilitado pois campo de código está vazio;
