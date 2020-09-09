select
	time, 
	latitude + 5 as latitude, 
	longitude + 5 as longitude, 
	avg(TSK) as TSK, 
	avg(PSFC) as PSFC, 
	avg(EMISS) as EMISS, 
    avg(GRDFLX) as GRDFLX,
    avg(RAINC) as RAINC,
	count(*) as count
from 
	weather
--where 
	--time = <time>
group by 
	time, latitude / 10, longitude / 10
