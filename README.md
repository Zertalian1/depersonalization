# Big Case Big Base

Big Case Big Base (BigCBB) - это удобный сервис по обезличиванию базы данных.

## Функционал
- Авторизация
- Просмотр, редактирование, сортировка и поиск по базе данных
- Обезличенивание базы данных
- Загрузка базы данных через xlsx файл
- Выгрузка обезличенной базы данных в xlsx формате

## Стэк
BigCBB использует следующие технологии:
- [Java] + [SpringBoot] - бэкенд
- [ReactJS] и [Node.js] - фронт
- [PostgreSQL] - база данных
- [Maven] - инструмент сборки  проекта


## Установка
Рекомендуется использовать Docker для запуска BigCBB.
```sh
docker-compose build
docker-compose up
```
####Убедитесь в том, что все контейнеры запущены.
При развертывании докер образа может получиться так, что база данных запуститься позже бэкеда.
В такой ситуации достаточно перезапустить контейнер отвечающий за бэкенд.

После запуска всех контейнеров, перейдите в браузере по адресу:
```sh
localhost:3000
```
#### Учетные данные администратора
>Логин: `admin`<br/>
>Пароль: `password`
### Начальные данные
>Файл `testData.xlsx` содержит тестовые начальные данные для базы данных<br/>
>Вы можете использовать этот файл для загрузки данных после авторизации на сервисе, нажав на кнопку `Загрузить данные`


## Ручной способ установки
Для ручного способа запуска требуется [Node.js], [npm], [PostgreSQL], [Maven]
### Настройка базы данных
В [PostgreSQL] должны быть 2 базы данных `BigCaseClub` и `BigCaseClubDepersonalize`<br/><br/>
Также нужно отредактировать файл `/app/src/main/resources/application.properties`:<br/><br/>
Изменить поле `jdbc:postgresql://db1:5432/BigCaseClub` на `jdbc:postgresql://localhost:5432/BigCaseClub`<br/><br/>
Изменить поле `jdbc:postgresql://db2:6101/BigCaseClubDepersonalize` на `jdbc:postgresql://localhost:5432/BigCaseClubDepersonalize`<br/><br/>
В полях `app.personalize.datasource.password` поставить пароль вашей базы данных<br/>
### Запуск бэкенда
```sh
cd app
mvnw spring-boot:run
```

### Запуск фронтенда
```sh
cd frontend/app
npm install
npm start
```
## Ссылка на репозиторий
https://git.codenrock.com/adventure-league/cnrprod-team-27357/depersonalization

[SpringBoot]:https://spring.io/
[ReactJS]:https://reactjs.org/
[Node.js]:https://nodejs.org/
[PostgreSQL]:https://www.postgresql.org/
[Maven]:https://maven.apache.org/
[npm]:https://www.npmjs.com/
[Java]:https://www.java.com/

 

