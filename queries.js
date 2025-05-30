Basic CRUD Operations
// Find all books in a specific genre
db.books.find({ genre: 'Fiction' });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// Find books by a specific author
db.books.find({ author: 'George Orwell' });

// Update the price of a specific book
db.books.updateOne({ title: '1984' }, { $set: { price: 11.99 } });

// Delete a book by its title
db.books.deleteOne({ title: 'Moby Dick' });

Advanced Queries
// Find books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection: only return title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort by price ascending
db.books.find().sort({ price: 1 });

// Sort by price descending
db.books.find().sort({ price: -1 });

// Pagination: skip 0 and limit to 5
db.books.find().limit(5);

// Pagination: page 2 (skip 5, limit 5)
db.books.find().skip(5).limit(5);

Aggregation Pipeline
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [ { $toString: { $multiply: ["$_id", 10] } }, "s" ] },
      count: 1,
      _id: 0
    }
  }
]);

