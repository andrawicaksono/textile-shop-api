SELECT *
FROM users u
JOIN orders o ON u.id = o.userId;