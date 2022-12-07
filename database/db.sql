create database  database_links;
use database_links;

create table users(
    id int not null primary key auto_increment,
    username text not null ,
    password text not null,
    fullname text not null
);

describe users;

select * from users;

create table links(
  id int not null  auto_increment primary key,
  title text not null ,
  url text not null ,
  description text,
  user_id int,
  created_at timestamp NOT NULL default current_timestamp,
  constraint fk_user foreign key (user_id) references users(id)
);

alter table links add url text not null;

select *from links;

describe links;

insert into links set title='asd', description = 'dsfsdf', url='sdfsdf';

SELECT * FROM links WHERE id =7;

alter table links add public bool not null;

insert into links set title='a', description='2 descripcion', url='http://www.google.com', user_id=5, public=false;

SELECT a.*, b.fullname  FROM links a, users b WHERE a.publico = 1 and a.user_id = b.id

