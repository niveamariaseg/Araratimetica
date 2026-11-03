# Cálculo em Missões

Esboço navegável (React Native + Expo) de um app gamificado de matemática para Introdução ao Cálculo (TADS / UDESC).

## Executar

Com Node.js LTS instalado:

```sh
npm install
npx expo start
```

Abra pelo app **Expo Go** no celular (escaneie o QR code) ou pressione `w` para abrir no navegador.

> Atenção: salve os arquivos `.json` em UTF-8 **sem BOM**. O `Set-Content`/`Out-File` do Windows PowerShell 5 adiciona um BOM, e isso quebra o `npx expo start` com o erro "Unexpected token ... is not valid JSON".

## Telas (baseadas no `Wireframes.pdf`)

| Wireframe | Arquivo | O que faz |
|---|---|---|
| Cadastro | `src/screens/LoginScreen.js` | Nome, e-mail `@edu.udesc.br` (RN01) e senha; confirmação por e-mail simulada (RF02) |
| Tela 1 – Trilha | `src/screens/PathScreen.js` | Caminho sinuoso com lições bloqueadas, disponíveis e concluídas (RF04, RN02); ofensiva, XP e emblemas no topo |
| Tela 2 – Missões | `src/screens/QuestsScreen.js` | Boas-vindas com mascote, missões diárias (RF09) e próximas lições |
| Tela 3 – Emblemas | `src/screens/QuestsScreen.js` | Grade de emblemas de maestria e de metas (RF08) |
| Tela 4 – Exercício | `src/screens/LessonScreen.js` | Saída, barra de progresso, enunciado, gráfico de apoio, 4 alternativas, feedback com dica (RF05, RF06) e pedido de ajuda com o status "Aguardando atendimento" (RF07, RN04) |
| Tela 5 – Perfil | `src/screens/ProfileScreen.js` | Avatar, nome, estatísticas, vitrine de emblemas e pedidos de ajuda (RF03) |

## Visual

- Fundo branco e paleta tirada do mascote: vermelho (marca e navegação), azul (ações principais), amarelo (XP, missões e troféus) e verde (acerto). As cores ficam em `src/theme.js`.
- As variações do mascote em `static/` foram convertidas para PNG com fundo transparente em `assets/mascote/`. Os originais continuam em `static/`. Cada módulo da trilha tem um mascote próprio, e o mascote reage ao acerto, ao erro, ao pedido de ajuda, à saída da lição e à conclusão.

O conteúdo fica em `src/data.js`: 4 módulos (Fundamentos, Equações, Funções e Funções exponenciais), com 2 lições de 3 questões cada.

## Limites do esboço

- O progresso fica só na memória e é reiniciado ao fechar o app. Não há backend, e-mail real nem autenticação.
- Ainda não há perfis de professor e monitor (RF11–RF14), resposta aos pedidos de ajuda nem cálculo real da nota de participação.
