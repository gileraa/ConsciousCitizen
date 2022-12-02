insert into role
(ID, NAME)
values (0, 'Admin');
insert into role
(ID, NAME)
values (1, 'DefaultActor');


insert into rubric
(id, description, name)
values (1, 'Products', 'Expired Products');

insert into rubric
(id, description, name)
values (2, 'Parking', 'No parking((');


insert into actor
(id, apartment, building, city, email, first_name, last_name, login, middle_name, newsletter, password, phone_number, status, street, role_id)
values (1, 23, 49, 'Samara', 'gena.bukin@rambler.com', 'Gena', 'Bukin', 'bukinator300', 'Olegovich', false, 'bubukinPass_1@)3', '+79274586538', true, 'Ivana Bulkina', 0);

insert into actor
(id, apartment, building, city, email, first_name, last_name, login, middle_name, newsletter, password, phone_number, status, street, role_id)
values (2, 32, 41, 'Samara', 'dr3amer912@mail.ru', 'Valera', 'Bitkonov', 'Premium69ValeraBestGangster98', 'Tihonovich', true, 'qwerty', '+79875462598', true, 'Minina', 1);

insert into actor
(id, apartment, building, city, email, first_name, last_name, login, middle_name, newsletter, password, phone_number, status, street, role_id)
values (3, 321, 1, 'Samara', 'itelligent@princess.com', 'Viktoria', 'Secret', 'i_am_dominant', 'Viktorovna', true, 'passWord@1', '+79375682147', true, 'Kulibina', 1);

insert into actor
(id, apartment, building, city, email, first_name, last_name, login, middle_name, newsletter, password, phone_number, status, street, role_id)
values (4, 583, 34, 'Samara', 'homoNotSapiens@ssau.ru', 'Andrew', 'Bubildin', 'why_am_i_here', 'Maksomovich', false, 'KiloShokoladaHochu(', '+73958475985', true, 'JojoReference', 1);

insert into actor
(id, apartment, building, city, email, first_name, last_name, login, middle_name, newsletter, password, phone_number, status, street, role_id)
values (5, 132, 222, 'Samara', 'ya_ustal_pridumivat@emaili.vso', 'Evgeniya', 'Familiya', 'ya_prosto_ho4u_pitcu(((', 'Ticketovna', false, 's_gribami_o4ech', '+78569584525', true, 'Sergeya Commitova', 1);


insert into address
(id, building, city, latitude, longitude, street)
values (1, '15B', 'Samara', 53.21268640687244, 50.181609172061634, 'Moskovskoye Shosse');

insert into address
(id, building, city, latitude, longitude, street)
values (2, '64B', 'Samara', 53.20944794239935, 50.175454855192896, 'Revolutrionnaya');

insert into address
(id, building, city, latitude, longitude, street)
values (3, '28', 'Samara', 53.21011857343883, 50.173329291925434, 'Moskovskoye Shosse');

insert into address
(id, building, city, latitude, longitude, street)
values (4, '10', 'Samara',	53.218262769601104,	50.16489634990825, 'Lukachova');

insert into institution
(id, city, description, district, name, rubric_id)
values (1, 'Samara', 'InstitutionDescription1', 'InstitutionDistrict1', 'Institution1', 1);

insert into institution
(id, city, description, district, name, rubric_id)
values (2, 'Samara', 'InstitutionDescription2', 'InstitutionDistrict2', 'Institution2', 2);


insert into event
(id, actor_id, rubric_id, address_id, status, theme, message_text, date, result)
values (1, 2, 1, 2, false, 'Produkti', 'Tut v pyatoro4ke actsiya, vse suda!!!!', '10.10.2022',  true);

insert into event
(id, actor_id, rubric_id, address_id, status, theme, message_text, date, result, image_name, image_name2)
values (2, 3, 2, 3, true, 'Tema soobsheniya', 'Pojalui hvatit interneta na segodnya', '10.12.2022',  false, 'Event_2_1', 'Event_2_2');
