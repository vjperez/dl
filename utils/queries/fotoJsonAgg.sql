SELECT  json_agg(url) as losFoto 
    FROM foto
    WHERE nepe_id = -2147483648
;