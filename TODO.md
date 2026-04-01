# TO DOs

## Funcionalidades e desejos

- Botão de configurações no canto direito do header. Deve abrir tela própria.
- Context para preferências de usuário, usando persistência SQLite.
- Seletor de idioma (EN, ES, PT, FR)
- Melhorar experiência no momento do alarme. Usar tela cheia ou ações na notificação.

## Problemas

- ⚠️ Quando uma tarefa é concluida, causa atualização do array de Tasks, causando reset do "visualRemaining". Porém a notificação toca no momento certo.
- Problema grave relacionado à forma de contar o tempo restante. Deveria ser setadas duas Dates e feito comparação entre elas para obter o remainingTimeInSeconds.

- Melhorar o SecondsTicker, pode ter time drift.

## Obs

- Expo notifications tem um bug conhecido ao abrir o app através da notificação. Use uma build de release para testar sem o bug.
