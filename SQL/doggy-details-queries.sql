/*
insert into Owner
values ('Todd', 'Spainhour', 'todd@test.com', 'password')

select *
from [Owner]

update [Owner]
set AccountEmail = 'cindy@test.com'
where OwnerId = 1

delete from [Owner]
where OwnerID between 14 and 16

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
*/
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



