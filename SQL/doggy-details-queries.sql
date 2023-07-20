/*
insert into Owner
values ('Todd', 'Spainhour', 'todd@test.com', 'password')

select *
from [Owner]

select *
from Pet

insert into Pet
values (1, 'Ranger', 'Dog')

update [Owner]
set AccountEmail = 'cindy@test.com'
where OwnerId = 1

delete from pet
where PetID between 37 and 50

select *
from Pet

update Pet
set OwnerID = 1 
where petID =1


select * from [Owner]
full join Pet 
on Pet.OwnerId = [Owner].[OwnerId]
where [Owner].OwnerId = 1

insert into Medicine
values (2, 'pain-b-gone', 1.2, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

select *
from Pet
full JOIN Medicine
on Pet.PetId = Medicine.PetID
where Pet.PetId = 2

insert into Food (PetID, FoodName, MealsPerDay, Amount, CompletedMeal)
values (2, 'kibbles and bits', 5, 3.45, 1)

select *
from Medicine

select *
from Exercise

insert into Exercise (PetID, Type, Distance)
values (2, 'walk', 1.2)

insert into Note
values (2, 'had a good walk')

select *
from Owner

-- query Owner table, see if username already exists
declare @userSupliedEmailAddress varchar(50)
set @userSupliedEmailAddress = 'todd@test.com'

select case when exists (
select AccountEmail
from [Owner]
where AccountEmail = @userSupliedEmailAddress
)
then cast(0 as bit)
else cast(1 as bit)
end

select AccountEmail
from [Owner]
where AccountEmail = @userSupliedEmailAddress
*/

declare @AccountEmail VARCHAR(50);
declare @AccountPassword VARCHAR(50)

set @AccountEmail = 'john@test.com'
set @AccountPassword = 'johnpassword'

select case when exists 
(select [Owner].AccountEmail from [Owner]
where @AccountEmail = @AccountEmail AND AccountPassword = @AccountPassword)
then (select OwnerID from Owner where AccountEmail = @AccountEmail AND AccountPassword = @AccountPassword)
else (0)
end;
