FROM node:alpine
WORKDIR /usr/app/front
EXPOSE 3000
COPY ./ ./
RUN npm install
RUN npm install yup
RUN npm install formik
CMD ["npm", "start"]