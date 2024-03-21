SELECT array
    (SELECT
        url 
        FROM foto
        WHERE nepe_id = -2147483648
    );