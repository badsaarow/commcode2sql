# commcode2sql

> 공통코드 JSON으로 INSERT, UPDATE SQL 문 만들기

## 개발환경 설정

``` bash
# install vue cl
npm install -g vue-cli

# git clone
git clone xxx
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Deploy

``` bash
npm run build
aws s3 cp ./dist/ s3://comsql.0970.co.kr/ --recursive
```

## S3 bucket

``` bash
aws s3api create-bucket --bucket comsql.0970.co.kr --region us-east-1
```