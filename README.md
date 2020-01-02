# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false,unique: true|
|email|string|null: false,unique: true|
|password|string|null: false|

### Association
- has_many :posts

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|groups_name|integer|null: false|
|groups_member|integer|null: false|

### postsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null:false|
|group_id|integer|null:false|
|date|integer|null:false|
|time|integer|null:false|
|text|string||
|image|text||

### Association
- belongs_to :groups_users