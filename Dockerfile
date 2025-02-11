# Usar uma imagem base do Node.js com suporte ao Alpine Linux para ser leve
FROM node:20.15.0

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos necessários para instalar as dependências
COPY package.json yarn.lock* ./ 

# Instalar as dependências
RUN yarn install --frozen-lockfile

# Copiar o restante do código para o container
COPY . .

# Construir o projeto Next.js (gera a versão otimizada para produção)
RUN npm run build

# Informar que o container expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
