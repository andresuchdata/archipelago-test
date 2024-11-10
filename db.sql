# 1. how many customers there are from Germany
SELECT DISTINCT COUNT(CustomerID) FROM Customers where Country = 'Germany';

# 2. Write a query that shows me a list of the countries that have the most customers; from most customers to least customers. 
# Don’t show countries that have less than 5 customers
SELECT COUNT(CustomerID), Country FROM Customers
group by Country
HAVING COUNT(CustomerID) >= 5
order by COUNT(CustomerID) DESC;

# Question 3
SELECT Customers.CustomerName,
COUNT(OrderID) AS TotalOrder, 
FORMAT(MIN(OrderDate), 'yyyy-MM-dd') AS FirstOrder, 
FORMAT(MAX(OrderDate), 'yyyy-MM-dd') AS LastOrder
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY Customers.CustomerName
HAVING COUNT(OrderID) >= 5
ORDER by MAX(OrderDate) DESC;




