create database  database_links;
use database_links;

create table users
(
    id       int auto_increment
        primary key,
    username text not null,
    password text not null,
    fullname text not null
);

create table links
(
    id          int auto_increment
        primary key,
    title       text                                  not null,
    description text                                  null,
    user_id     int                                   null,
    created_at  timestamp default current_timestamp() not null,
    url         text                                  not null,
    publico     tinyint(1)                            not null,
    constraint fk_user
        foreign key (user_id) references users (id)
);

create
    function newLink(title text, description text, url text, user_id int,
                                              publico tinyint(1)) returns text
begin
        declare id text default '';
        insert into links set links.title=title, links.description=description, links.url=url, links.user_id=user_id, links.publico=publico;
        IF(publico = true)then
            set id = (SELECT LAST_INSERT_ID());
        else
            set id = 'False';
        end if;
        return id;
    end;